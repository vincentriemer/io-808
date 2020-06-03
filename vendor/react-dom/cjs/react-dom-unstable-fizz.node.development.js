/** @license React vundefined
 * react-dom-unstable-fizz.node.development.js
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

function scheduleWork(callback) {
  setImmediate(callback);
}
function flushBuffered(destination) {
  // If we don't have any more data to send right now.
  // Flush whatever is in the buffer to the wire.
  if (typeof destination.flush === 'function') {
    // http.createServer response have flush(), but it has a different meaning and
    // is deprecated in favor of flushHeaders(). Detect to avoid a warning.
    if (typeof destination.flushHeaders !== 'function') {
      // By convention the Zlib streams provide a flush function for this purpose.
      destination.flush();
    }
  }
}
function beginWriting(destination) {
  // Older Node streams like http.createServer don't have this.
  if (typeof destination.cork === 'function') {
    destination.cork();
  }
}
function writeChunk(destination, buffer) {
  var nodeBuffer = buffer; // close enough

  return destination.write(nodeBuffer);
}
function completeWriting(destination) {
  // Older Node streams like http.createServer don't have this.
  if (typeof destination.uncork === 'function') {
    destination.uncork();
  }
}
function close(destination) {
  destination.end();
}
function convertStringToBuffer(content) {
  return Buffer.from(content, 'utf8');
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
  beginWriting(destination);

  try {
    for (var i = 0; i < chunks.length; i++) {
      var chunk = chunks[i];
      writeChunk(destination, chunk);
    }
  } finally {
    completeWriting(destination);
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

function createDrainHandler(destination, request) {
  return function () {
    return startFlowing(request);
  };
}

function pipeToNodeWritable(children, destination) {
  var request = createRequest(children, destination);
  destination.on('drain', createDrainHandler(destination, request));
  startWork(request);
}

exports.pipeToNodeWritable = pipeToNodeWritable;
  })();
}
