var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}

const rpcMethods = {};

function jsonRpcWrap(func, namespace) {
    if(typeof func !== 'function') {
        throw "not a function";
    }
    if(typeof func.name !== 'string' || func.name.trim() === '') {
        throw "api functions must be named";
    }
    func.parameters = getParamNames(func);
    func.namespace = namespace || "";

    const qualifiedName = func.namespace.length ? `${func.namespace}::${func.name}` : func.name;
    rpcMethods[qualifiedName] = func;

    return func;
}

function jsonRpcWrapApi(api, namespace) {
    for(var key in api) {
        jsonRpcWrap(api[key], namespace);
    }
    return api;
}

function jsonRpcInvoke(message, context, socket) {
    try {
        const request = JSON.parse(message);
        if(typeof request !== 'object') {
            socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: -32600, message: 'invalid request' }, id: null }));
            return;
        }
        if(request.jsonrpc !== '2.0') {
            if(request.id !== undefined) {
                socket.emit('rpc', JSON.stringify({ error: { code: -32600, message: 'invalid request: missing jsonrpc field or bad version', id: request.id } }));
            }
            return;
        }
        if(typeof request.method !== 'string') {
            if(request.id !== undefined) {
                socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: -32600, message: 'invalid request: missing method field', id: request.id } }));
            }
            return;
        }
        const handler = rpcMethods[request.method] || null;
        if(handler === null) {
            if(request.id !== undefined) {
                socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: -32601, message: 'method not found' }, id: request.id }));
            }
            return;
        }

        const idType = typeof request.id;
        
        if(request.id !== undefined && request.id !== null && idType !== 'string' && idType !== 'number') {
            socket.emit('rpc', JSON.stringify({ error: { code: -32600, message: 'invalid request id' }, id: null }));
            return;
        }

        if(idType === 'number' && Math.floor(request.id) !== request.id) {
            socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: -32600, message: 'id number is not an integer' }, id: null }));
            return;
        }
    
        if(request.params !== undefined && typeof request.params !== 'object') {
            if(request.id !== undefined) {
                socket.emit('rpc', { jsonrpc: '2.0', error: { code: -32600, message: 'invalid request' }, id: request.id });
            }
            return;
        }

        var parameters = [];
        if(request.params instanceof Array) {
            if(request.params.length !== handler.parameters.length) {
                if(request.id !== undefined) {
                    socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: -32602, message: `invalid number of arguments`}, id: request.id }));
                }
                return;
            }
            parameters = request.params;
        } else if(typeof request.params === 'object') {
            parameters.length = handler.parameters.length;
            for(var i = 0; i < parameters.length; i++) {
                const key = handler.parameters[i];
                if(!request.hasOwnProperty(key)) {
                    if(request.id !== undefined) {
                        socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: -32602, message: `missing request parameter: '${key}'` }, id: request.id }));
                    }
                    return;
                }
                parameters[i] = request[key];
            }
        } else if(request.params !== undefined){
            if(request.id !== undefined) {
                socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: -32602, message: 'invalid request parameters'}, id: request.id }));
            }
            return;
        }

        try {
            Promise.resolve(handler.apply(context, parameters))
                .then((result) => {
                    if(request.id !== undefined) {
                        socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', result: result === undefined ? null : result, id: request.id }));
                    }
                })
                .catch(error => {
                    const errorCode = (error.code && error.code >= 0 && error.code <= 99) ?
                        -32000 - error.code : -32000;
                    if(request.id !== undefined) {
                        socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: errorCode, message: error.toString(), data: error.data }, id: request.id }));
                    }
                });
        }
        catch(e) {
            const errorCode = (e.code && e.code >= 0 && e.code <= 99) ?
                        -32000 - e.code : -32000;
            if(id !== undefined) {
                socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: errorCode, message: e.toString(), data: e.data }, id: id }));
            }
        }
    }
    catch(e) {
        const errorCode = (e.code && e.code >= 0 && e.code <= 99) ?
                        -32000 - e.code : -32000;
        socket.emit('rpc', JSON.stringify({ jsonrpc: '2.0', error: { code: errorCode, message: 'request is not a valid json object: ' + e.toString() + '\n' + e.stack, data: e.data }, id: null }));
    }
}

module.exports = {
    jsonRpcWrapApi,
    jsonRpcInvoke
};  