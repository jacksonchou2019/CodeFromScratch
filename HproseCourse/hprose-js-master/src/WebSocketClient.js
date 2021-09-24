/**********************************************************\
|                                                          |
|                          hprose                          |
|                                                          |
| Official WebSite: http://www.hprose.com/                 |
|                   http://www.hprose.org/                 |
|                                                          |
\**********************************************************/
/**********************************************************\
 *                                                        *
 * WebSocketClient.js                                     *
 *                                                        *
 * hprose websocket client for JavaScript.                *
 *                                                        *
 * LastModified: Dec 2, 2016                              *
 * Author: Ma Bingyao <andot@hprose.com>                  *
 *                                                        *
\**********************************************************/

(function (hprose, global, undefined) {
    'use strict';

    var StringIO = hprose.StringIO;
    var Client = hprose.Client;
    var Future = hprose.Future;
    var TimeoutError = global.TimeoutError;

    var defineProperties = hprose.defineProperties;
    var toBinaryString = hprose.toBinaryString;
    var toUint8Array = hprose.toUint8Array;
    var parseuri = hprose.parseuri;
    var WebSocket = global.WebSocket || global.MozWebSocket;

    function noop(){}
    function WebSocketClient(uri, functions, settings) {
        if (typeof(WebSocket) === "undefined") {
            throw new Error('WebSocket is not supported by this browser.');
        }
        if (this.constructor !== WebSocketClient) {
            return new WebSocketClient(uri, functions, settings);
        }

        Client.call(this, uri, functions, settings);

        var _id = 0;
        var _count = 0;
        var _futures = [];
        var _contexts = [];
        var _requests = [];
        var _ready = null;
        var ws = null;

        var self = this;

        function getNextId() {
            return (_id < 0x7fffffff) ? ++_id : _id = 0;
        }
        function send(id, request) {
            var stream = new StringIO();
            stream.writeInt32BE(id);
            if (_contexts[id].binary) {
                stream.write(request);
            }
            else {
                stream.writeUTF16AsUTF8(request);
            }
            var message = toUint8Array(stream.take());
            if (ArrayBuffer.isView) {
                ws.send(message);
            }
            else {
                ws.send(message.buffer);
            }
        }
        function onopen(e) {
            _ready.resolve(e);
        }
        function onmessage(e) {
            var stream;
            if (typeof e.data === "string") {
                stream = new StringIO(StringIO.utf8Encode(e.data));
            }
            else {
                stream = new StringIO(toBinaryString(e.data));
            }
            var id = stream.readInt32BE();
            var future = _futures[id];
            var context = _contexts[id];
            delete _futures[id];
            delete _contexts[id];
            if (future !== undefined) {
                --_count;
                var data = stream.read(stream.length() - 4);
                if (!context.binary) {
                    data = StringIO.utf8Decode(data);
                }
                future.resolve(data);
            }
            if ((_count < 100) && (_requests.length > 0)) {
                ++_count;
                var request = _requests.pop();
                _ready.then(function() { send(request[0], request[1]); });
            }
            if (_count === 0 && !self.keepAlive()) { close(); }
        }
        function onclose(e) {
            _futures.forEach(function(future, id) {
                future.reject(new Error(e.code + ':' + e.reason));
                delete _futures[id];
            });
            _count = 0;
            ws = null;
        }
        function connect() {
            _ready = new Future();
            ws = new WebSocket(self.uri());
            ws.binaryType = 'arraybuffer';
            ws.onopen = onopen;
            ws.onmessage = onmessage;
            ws.onerror = noop;
            ws.onclose = onclose;
        }
        function sendAndReceive(request, context) {
            var id = getNextId();
            var future = new Future();
            _futures[id] = future;
            _contexts[id] = context;
            if (context.timeout > 0) {
                future = future.timeout(context.timeout).catchError(function(e) {
                    delete _futures[id];
                    --_count;
                    throw e;
                },
                function(e) {
                    return e instanceof TimeoutError;
                });
            }
            if (ws === null ||
                ws.readyState === WebSocket.CLOSING ||
                ws.readyState === WebSocket.CLOSED) {
                connect();
            }
            if (_count < 100) {
                ++_count;
                _ready.then(function() { send(id, request); });
            }
            else {
                _requests.push([id, request]);
            }
            if (context.oneway) { future.resolve(); }
            return future;
        }
        function close() {
            if (ws !== null) {
                ws.onopen = noop;
                ws.onmessage = noop;
                ws.onclose = noop;
                ws.close();
            }
        }

        defineProperties(this, {
            sendAndReceive: { value: sendAndReceive },
            close: { value: close }
        });
    }

    function checkuri(uri) {
        var parser = parseuri(uri);
        if (parser.protocol === 'ws:' ||
            parser.protocol === 'wss:') {
            return;
        }
        throw new Error('This client desn\'t support ' + parser.protocol + ' scheme.');
    }

    function create(uri, functions, settings) {
        if (typeof uri === 'string') {
            checkuri(uri);
        }
        else if (Array.isArray(uri)) {
            uri.forEach(function(uri) { checkuri(uri); });
        }
        else {
            throw new Error('You should set server uri first!');
        }
        return new WebSocketClient(uri, functions, settings);
    }

    defineProperties(WebSocketClient, {
        create: { value: create }
    });

    global.HproseWebSocketClient =
    hprose.WebSocketClient = WebSocketClient;

})(hprose, hprose.global);
