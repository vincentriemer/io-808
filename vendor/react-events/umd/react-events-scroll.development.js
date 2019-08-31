/** @license React vundefined
 * react-events-scroll.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
	typeof define === 'function' && define.amd ? define(['react'], factory) :
	(global.ReactEventsScroll = factory(global.React));
}(this, (function (React) { 'use strict';

var UserBlockingEvent = 1;

var hasPointerEvents = typeof window !== 'undefined' && window.PointerEvent !== undefined;
var targetEventTypes = hasPointerEvents ? ['scroll', 'pointerdown', 'keyup', 'wheel'] : ['scroll', 'mousedown', 'touchstart', 'keyup', 'wheel'];
var rootEventTypes = hasPointerEvents ? ['pointercancel', 'pointerup'] : ['touchcancel', 'touchend'];

function isFunction(obj) {
  return typeof obj === 'function';
}

function createScrollEvent(event, context, type, target, pointerType, direction) {
  var clientX = null;
  var clientY = null;
  var pageX = null;
  var pageY = null;
  var screenX = null;
  var screenY = null;

  if (event) {
    var nativeEvent = event.nativeEvent;
    clientX = nativeEvent.clientX;
    clientY = nativeEvent.clientY;
    pageX = nativeEvent.pageX;
    pageY = nativeEvent.pageY;
    screenX = nativeEvent.screenX;
    screenY = nativeEvent.screenY;
  }

  return {
    target: target,
    type: type,
    pointerType: pointerType,
    direction: direction,
    timeStamp: context.getTimeStamp(),
    clientX: clientX,
    clientY: clientY,
    pageX: pageX,
    pageY: pageY,
    screenX: screenX,
    screenY: screenY,
    x: clientX,
    y: clientY
  };
}

function dispatchEvent(event, listener, context, state, name, eventPriority) {
  var target = state.scrollTarget;
  var pointerType = state.pointerType;
  var direction = state.direction;
  var syntheticEvent = createScrollEvent(event, context, name, target, pointerType, direction);
  context.dispatchEvent(syntheticEvent, listener, eventPriority);
}

var scrollResponderImpl = {
  targetEventTypes: targetEventTypes,
  getInitialState: function () {
    return {
      direction: '',
      isTouching: false,
      pointerType: '',
      prevScrollTop: 0,
      prevScrollLeft: 0,
      scrollTarget: null
    };
  },
  onEvent: function (event, context, props, state) {
    var pointerType = event.pointerType,
        target = event.target,
        type = event.type;

    if (props.disabled) {
      if (state.isTouching) {
        state.isTouching = false;
        state.scrollTarget = null;
        state.isDragging = false;
        state.direction = '';
        context.removeRootEventTypes(rootEventTypes);
      }

      return;
    }

    switch (type) {
      case 'scroll':
        {
          var prevScrollTarget = state.scrollTarget;
          var scrollLeft = 0;
          var scrollTop = 0; // Check if target is the document

          if (target.nodeType === 9) {
            var bodyNode = target.body;

            if (bodyNode !== null) {
              scrollLeft = bodyNode.offsetLeft;
              scrollTop = bodyNode.offsetTop;
            }
          } else {
            scrollLeft = target.scrollLeft;
            scrollTop = target.scrollTop;
          }

          if (prevScrollTarget !== null) {
            if (scrollTop === state.scrollTop) {
              if (scrollLeft > state.scrollLeft) {
                state.direction = 'right';
              } else {
                state.direction = 'left';
              }
            } else {
              if (scrollTop > state.scrollTop) {
                state.direction = 'down';
              } else {
                state.direction = 'up';
              }
            }
          } else {
            state.direction = '';
          }

          state.scrollTarget = target;
          state.scrollLeft = scrollLeft;
          state.scrollTop = scrollTop;

          if (state.isTouching && !state.isDragging) {
            state.isDragging = true;
            var onScrollDragStart = props.onScrollDragStart;

            if (isFunction(onScrollDragStart)) {
              dispatchEvent(event, onScrollDragStart, context, state, 'scrolldragstart', UserBlockingEvent);
            }
          }

          var onScroll = props.onScroll;

          if (isFunction(onScroll)) {
            dispatchEvent(event, onScroll, context, state, 'scroll', UserBlockingEvent);
          }

          break;
        }

      case 'keyup':
        {
          state.pointerType = pointerType;
          break;
        }

      case 'mousedown':
      case 'wheel':
        {
          state.pointerType = 'mouse';
          break;
        }

      case 'pointerdown':
        {
          state.pointerType = pointerType;

          if (pointerType === 'touch' && !state.isTouching) {
            state.isTouching = true;
            context.addRootEventTypes(rootEventTypes);
          }

          break;
        }

      case 'touchstart':
        {
          if (!state.isTouching) {
            state.isTouching = true;
            state.pointerType = 'touch';
            context.addRootEventTypes(rootEventTypes);
          }
        }
    }
  },
  onRootEvent: function (event, context, props, state) {
    var type = event.type;

    switch (type) {
      case 'pointercancel':
      case 'pointerup':
      case 'touchcancel':
      case 'touchend':
        {
          if (state.isTouching) {
            var onScrollDragEnd = props.onScrollDragEnd;

            if (state.isDragging && isFunction(onScrollDragEnd)) {
              dispatchEvent(event, onScrollDragEnd, context, state, 'scrolldragend', UserBlockingEvent);
            }

            state.isTouching = false;
            state.isDragging = false;
            state.scrollTarget = null;
            state.pointerType = '';
            context.removeRootEventTypes(rootEventTypes);
          }
        }
    }
  },
  onUnmount: function (context, props, state) {// TODO
  }
};
var ScrollResponder = React.unstable_createResponder('Scroll', scrollResponderImpl);
function useScroll(props) {
  return React.unstable_useResponder(ScrollResponder, props);
}

var Scroll = Object.freeze({
	ScrollResponder: ScrollResponder,
	useScroll: useScroll
});

var scroll = Scroll;

return scroll;

})));
