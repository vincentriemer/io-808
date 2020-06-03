/** @license React vundefined
 * react-dom-unstable-fizz.browser.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ReactDOMFizzServer = {}));
}(this, (function (exports) { 'use strict';

  function scheduleWork(callback) {
    callback();
  }
  function flushBuffered(destination) {// WHATWG Streams do not yet have a way to flush the underlying
    // transform streams. https://github.com/whatwg/streams/issues/960
  }
  function writeChunk(destination, buffer) {
    destination.enqueue(buffer);
    return destination.desiredSize > 0;
  }
  function close(destination) {
    destination.close();
  }
  var textEncoder = new TextEncoder();
  function convertStringToBuffer(content) {
    return textEncoder.encode(content);
  }

  function formatChunkAsString(type, props) {
    var str = '<' + type + '>';

    if (typeof props.children === 'string') {
      str += props.children;
    }

    str += '</' + type + '>';
    return str;
  }
  function formatChunk(type, props) {
    return convertStringToBuffer(formatChunkAsString(type, props));
  }

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  var REACT_FRAGMENT_TYPE = 0xeacb;
  var REACT_STRICT_MODE_TYPE = 0xeacc;
  var REACT_PROFILER_TYPE = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  var REACT_SUSPENSE_TYPE = 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_RESPONDER_TYPE = 0xead6;
  var REACT_SCOPE_TYPE = 0xead7;
  var REACT_OPAQUE_ID_TYPE = 0xeae0;

  if (typeof Symbol === 'function' && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor('react.element');
    REACT_PORTAL_TYPE = symbolFor('react.portal');
    REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
    REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
    REACT_PROFILER_TYPE = symbolFor('react.profiler');
    REACT_PROVIDER_TYPE = symbolFor('react.provider');
    REACT_CONTEXT_TYPE = symbolFor('react.context');
    REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
    REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
    REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
    REACT_MEMO_TYPE = symbolFor('react.memo');
    REACT_LAZY_TYPE = symbolFor('react.lazy');
    REACT_BLOCK_TYPE = symbolFor('react.block');
    REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
    REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
    REACT_RESPONDER_TYPE = symbolFor('react.responder');
    REACT_SCOPE_TYPE = symbolFor('react.scope');
    REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
  }

  function createRequest(children, destination) {
    return {
      destination: destination,
      children: children,
      completedChunks: [],
      flowing: false
    };
  }

  function performWork(request) {
    var element = request.children;
    request.children = null;

    if (element && element.$$typeof !== REACT_ELEMENT_TYPE) {
      return;
    }

    var type = element.type;
    var props = element.props;

    if (typeof type !== 'string') {
      return;
    }

    request.completedChunks.push(formatChunk(type, props));

    if (request.flowing) {
      flushCompletedChunks(request);
    }

    flushBuffered(request.destination);
  }

  function flushCompletedChunks(request) {
    var destination = request.destination;
    var chunks = request.completedChunks;
    request.completedChunks = [];

    try {
      for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i];
        writeChunk(destination, chunk);
      }
    } finally {
    }

    close(destination);
  }

  function startWork(request) {
    request.flowing = true;
    scheduleWork(function () {
      return performWork(request);
    });
  }
  function startFlowing(request) {
    request.flowing = false;
    flushCompletedChunks(request);
  }

  function renderToReadableStream(children) {
    var request;
    return new ReadableStream({
      start: function (controller) {
        request = createRequest(children, controller);
        startWork(request);
      },
      pull: function (controller) {
        startFlowing(request);
      },
      cancel: function (reason) {}
    });
  }

  exports.renderToReadableStream = renderToReadableStream;

})));
