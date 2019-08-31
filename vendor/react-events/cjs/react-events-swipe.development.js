/** @license React vundefined
 * react-events-swipe.development.js
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

var DiscreteEvent = 0;
var UserBlockingEvent = 1;

var targetEventTypes = ['pointerdown'];
var rootEventTypes = ['pointerup', 'pointercancel', 'pointermove_active']; // In the case we don't have PointerEvents (Safari), we listen to touch events
// too

if (typeof window !== 'undefined' && window.PointerEvent === undefined) {
  targetEventTypes.push('touchstart', 'mousedown');
  rootEventTypes.push('mouseup', 'mousemove', 'touchend', 'touchcancel', 'touchmove_active');
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function createSwipeEvent(context, type, target, eventData) {
  return context.objectAssign({
    target: target,
    type: type,
    timeStamp: context.getTimeStamp()
  }, eventData);
}

function dispatchSwipeEvent(context, listener, name, state, eventPriority, eventData) {
  var target = state.swipeTarget;
  var syntheticEvent = createSwipeEvent(context, name, target, eventData);
  context.dispatchEvent(syntheticEvent, listener, eventPriority);
}

var swipeResponderImpl = {
  targetEventTypes: targetEventTypes,
  getInitialState: function () {
    return {
      direction: 0,
      isSwiping: false,
      lastDirection: 0,
      startX: 0,
      startY: 0,
      touchId: null,
      swipeTarget: null,
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
          if (!state.isSwiping) {
            var obj = nativeEvent;

            if (type === 'touchstart') {
              obj = nativeEvent.targetTouches[0];
              state.touchId = obj.identifier;
            }

            var x = obj.screenX;
            var y = obj.screenY;
            state.isSwiping = true;
            state.startX = x;
            state.startY = y;
            state.x = x;
            state.y = y;
            state.swipeTarget = target;
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

          if (state.isSwiping) {
            var obj = null;

            if (type === 'touchmove') {
              var targetTouches = nativeEvent.targetTouches;

              for (var i = 0; i < targetTouches.length; i++) {
                if (state.touchId === targetTouches[i].identifier) {
                  obj = targetTouches[i];
                  break;
                }
              }
            } else {
              obj = nativeEvent;
            }

            if (obj === null) {
              state.isSwiping = false;
              state.swipeTarget = null;
              state.touchId = null;
              context.removeRootEventTypes(rootEventTypes);
              return;
            }

            var x = obj.screenX;
            var y = obj.screenY;

            if (x < state.x) {
              state.direction = 3;
            } else if (x > state.x) {
              state.direction = 1;
            }

            state.x = x;
            state.y = y;
            var eventData = {
              diffX: x - state.startX,
              diffY: y - state.startY
            };
            var onSwipeMove = props.onSwipeMove;

            if (isFunction(onSwipeMove)) {
              dispatchSwipeEvent(context, onSwipeMove, 'swipemove', state, UserBlockingEvent, eventData);
            }

            nativeEvent.preventDefault();
          }

          break;
        }

      case 'pointercancel':
      case 'touchcancel':
      case 'touchend':
      case 'mouseup':
      case 'pointerup':
        {
          if (state.isSwiping) {
            if (state.x === state.startX && state.y === state.startY) {
              return;
            }

            var direction = state.direction;
            var lastDirection = state.lastDirection;

            if (direction !== lastDirection) {
              if (direction === 3) {
                var onSwipeLeft = props.onSwipeLeft;

                if (isFunction(onSwipeLeft)) {
                  dispatchSwipeEvent(context, onSwipeLeft, 'swipeleft', state, DiscreteEvent);
                }
              } else if (direction === 1) {
                var onSwipeRight = props.onSwipeRight;

                if (isFunction(onSwipeRight)) {
                  dispatchSwipeEvent(context, onSwipeRight, 'swiperight', state, DiscreteEvent);
                }
              }
            }

            var onSwipeEnd = props.onSwipeEnd;

            if (isFunction(onSwipeEnd)) {
              dispatchSwipeEvent(context, onSwipeEnd, 'swipeend', state, DiscreteEvent);
            }

            state.lastDirection = direction;
            state.isSwiping = false;
            state.swipeTarget = null;
            state.touchId = null;
            context.removeRootEventTypes(rootEventTypes);
          }

          break;
        }
    }
  }
};
var SwipeResponder = React.unstable_createResponder('Swipe', swipeResponderImpl);
function useSwipe(props) {
  return React.unstable_useResponder(SwipeResponder, props);
}

var Swipe = Object.freeze({
	SwipeResponder: SwipeResponder,
	useSwipe: useSwipe
});

var swipe = Swipe;

module.exports = swipe;
  })();
}
