/** @license React vundefined
 * react-events-drag.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var React = require('react');

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var DiscreteEvent = 0;
var UserBlockingEvent = 1;

var targetEventTypes = ['pointerdown'];
var rootEventTypes = ['pointerup', 'pointercancel', 'pointermove_active'];

// In the case we don't have PointerEvents (Safari), we listen to touch events
// too
if (typeof window !== 'undefined' && window.PointerEvent === undefined) {
  targetEventTypes.push('touchstart', 'mousedown');
  rootEventTypes.push('mouseup', 'mousemove', 'touchend', 'touchcancel', 'touchmove_active');
}

function createDragEvent(context, type, target, eventData) {
  return objectAssign({
    target: target,
    type: type,
    timeStamp: context.getTimeStamp()
  }, eventData);
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function dispatchDragEvent(context, listener, name, state, eventPriority, eventData) {
  var target = state.dragTarget;
  var syntheticEvent = createDragEvent(context, name, target, eventData);
  context.dispatchEvent(syntheticEvent, listener, eventPriority);
}

var dragResponderImpl = {
  targetEventTypes: targetEventTypes,
  getInitialState: function () {
    return {
      dragTarget: null,
      isPointerDown: false,
      isDragging: false,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    };
  },
  onEvent: function (event, context, props, state) {
    var target = event.target,
        type = event.type,
        nativeEvent = event.nativeEvent;

    switch (type) {
      case 'touchstart':
      case 'mousedown':
      case 'pointerdown':
        {
          if (!state.isDragging) {
            var obj = type === 'touchstart' ? nativeEvent.changedTouches[0] : nativeEvent;
            var x = state.startX = obj.screenX;
            var y = state.startY = obj.screenY;
            state.x = x;
            state.y = y;
            state.dragTarget = target;
            state.isPointerDown = true;
            var onDragStart = props.onDragStart;

            if (isFunction(onDragStart)) {
              dispatchDragEvent(context, onDragStart, 'dragstart', state, DiscreteEvent);
            }

            context.addRootEventTypes(rootEventTypes);
          }

          break;
        }
    }
  },
  onRootEvent: function (event, context, props, state) {
    var type = event.type,
        nativeEvent = event.nativeEvent;

    switch (type) {
      case 'touchmove':
      case 'mousemove':
      case 'pointermove':
        {
          if (event.passive) {
            return;
          }

          if (state.isPointerDown) {
            var obj = type === 'touchmove' ? nativeEvent.changedTouches[0] : nativeEvent;
            var x = obj.screenX;
            var y = obj.screenY;
            state.x = x;
            state.y = y;

            if (x === state.startX && y === state.startY) {
              return;
            }

            if (!state.isDragging) {
              state.isDragging = true;
              var onDragChange = props.onDragChange;

              if (isFunction(onDragChange)) {
                context.dispatchEvent(true, onDragChange, UserBlockingEvent);
              }
            } else {
              var onDragMove = props.onDragMove;

              if (isFunction(onDragMove)) {
                var eventData = {
                  diffX: x - state.startX,
                  diffY: y - state.startY
                };
                dispatchDragEvent(context, onDragMove, 'dragmove', state, UserBlockingEvent, eventData);
              }

              nativeEvent.preventDefault();
            }
          }

          break;
        }

      case 'pointercancel':
      case 'touchcancel':
      case 'touchend':
      case 'mouseup':
      case 'pointerup':
        {
          if (state.isDragging) {
            var onDragEnd = props.onDragEnd;

            if (isFunction(onDragEnd)) {
              dispatchDragEvent(context, onDragEnd, 'dragend', state, DiscreteEvent);
            }

            var _onDragChange = props.onDragChange;

            if (isFunction(_onDragChange)) {
              context.dispatchEvent(false, _onDragChange, UserBlockingEvent);
            }

            state.isDragging = false;
          }

          if (state.isPointerDown) {
            state.dragTarget = null;
            state.isPointerDown = false;
            context.removeRootEventTypes(rootEventTypes);
          }

          break;
        }
    }
  }
};
var DragResponder = React.unstable_createResponder('Drag', dragResponderImpl);
function useDrag(props) {
  return React.unstable_useResponder(DragResponder, props);
}

var Drag = Object.freeze({
	DragResponder: DragResponder,
	useDrag: useDrag
});

var drag = Drag;

module.exports = drag;
  })();
}
