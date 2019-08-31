/** @license React vundefined
 * react-events-keyboard.development.js
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

var targetEventTypes = ['keydown', 'keyup'];
/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */

var normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
};
/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */

var translateToKey = {
  '8': 'Backspace',
  '9': 'Tab',
  '12': 'Clear',
  '13': 'Enter',
  '16': 'Shift',
  '17': 'Control',
  '18': 'Alt',
  '19': 'Pause',
  '20': 'CapsLock',
  '27': 'Escape',
  '32': ' ',
  '33': 'PageUp',
  '34': 'PageDown',
  '35': 'End',
  '36': 'Home',
  '37': 'ArrowLeft',
  '38': 'ArrowUp',
  '39': 'ArrowRight',
  '40': 'ArrowDown',
  '45': 'Insert',
  '46': 'Delete',
  '112': 'F1',
  '113': 'F2',
  '114': 'F3',
  '115': 'F4',
  '116': 'F5',
  '117': 'F6',
  '118': 'F7',
  '119': 'F8',
  '120': 'F9',
  '121': 'F10',
  '122': 'F11',
  '123': 'F12',
  '144': 'NumLock',
  '145': 'ScrollLock',
  '224': 'Meta'
};

function isFunction(obj) {
  return typeof obj === 'function';
}

function getEventKey(nativeEvent) {
  var nativeKey = nativeEvent.key;

  if (nativeKey) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.
    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    var key = normalizeKey[nativeKey] || nativeKey;

    if (key !== 'Unidentified') {
      return key;
    }
  }

  return translateToKey[nativeEvent.keyCode] || 'Unidentified';
}

function createKeyboardEvent(event, context, type, target) {
  var nativeEvent = event.nativeEvent;
  var altKey = nativeEvent.altKey,
      ctrlKey = nativeEvent.ctrlKey,
      isComposing = nativeEvent.isComposing,
      location = nativeEvent.location,
      metaKey = nativeEvent.metaKey,
      repeat = nativeEvent.repeat,
      shiftKey = nativeEvent.shiftKey;
  return {
    altKey: altKey,
    ctrlKey: ctrlKey,
    isComposing: isComposing,
    key: getEventKey(nativeEvent),
    location: location,
    metaKey: metaKey,
    repeat: repeat,
    shiftKey: shiftKey,
    target: target,
    timeStamp: context.getTimeStamp(),
    type: type
  };
}

function dispatchKeyboardEvent(event, listener, context, type, target) {
  var syntheticEvent = createKeyboardEvent(event, context, type, target);
  context.dispatchEvent(syntheticEvent, listener, DiscreteEvent);
}

var keyboardResponderImpl = {
  targetEventTypes: targetEventTypes,
  onEvent: function (event, context, props) {
    var responderTarget = event.responderTarget,
        type = event.type;

    if (props.disabled) {
      return;
    }

    if (type === 'keydown') {
      var onKeyDown = props.onKeyDown;

      if (isFunction(onKeyDown)) {
        dispatchKeyboardEvent(event, onKeyDown, context, 'keydown', responderTarget);
      }
    } else if (type === 'keyup') {
      var onKeyUp = props.onKeyUp;

      if (isFunction(onKeyUp)) {
        dispatchKeyboardEvent(event, onKeyUp, context, 'keyup', responderTarget);
      }
    }
  }
};
var KeyboardResponder = React.unstable_createResponder('Keyboard', keyboardResponderImpl);
function useKeyboard(props) {
  return React.unstable_useResponder(KeyboardResponder, props);
}

var Keyboard = Object.freeze({
	KeyboardResponder: KeyboardResponder,
	useKeyboard: useKeyboard
});

var keyboard = Keyboard;

module.exports = keyboard;
  })();
}
