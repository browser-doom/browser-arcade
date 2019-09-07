import socket from './socket';

const requests : any = {};
let idCounter = 0;

socket.on('rpc', (data: string) => {
    try {
        var message = JSON.parse(data);
        if(message.jsonrpc === '2.0') {
            if(message.id === null) {
            }
            if(message.id && message.id in requests) {
                const [resolve, reject] = requests[message.id];
                delete requests[message.id];

                if(message.error) {
                    var error = new Error(message.error.message);
                    error.name = message.error.code;
                    reject(error);
                } else {
                    resolve(message.result);
                }
            }
        }
    }
    catch(e) {
        console.error(e);
    }
});

function invoke<R>(method: string, ...params: any[]): Promise<R> {
    const id = ++idCounter;
    const request = {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: id
    };

    return new Promise((resolve, reject) => {
        requests[id] = [resolve, reject];
        socket.emit('rpc', JSON.stringify(request));
    });
}

function jsonRpcWrap<R, T extends Array<any>>(func: (...args: T) => R|Promise<R>, namespace?: string): (...args: T) => Promise<R> {
    const n = namespace ? `${namespace}::${func.name}` : func.name;
    return (...args: T): Promise<R> => invoke<R>(n, ...args);
}

type RpcApiMethod<R, T extends Array<any>> = {
    (...args: T): Promise<R>;
};

type Api = { [index: string]: (...args: any[]) => any };

type RpcApi<T extends { [index: string]: (...args: any[]) => any }> = { [P in keyof T]: RpcApiMethod<ReturnType<T[P]>, Parameters<T[P]>> }

export default function jsonRpcWrapApi<T extends Api>(api: T, namespace?: string): RpcApi<T> {
    const value: RpcApi<T> = {} as RpcApi<T>;
    for(var key in api) {
        value[key] = jsonRpcWrap(api[key], namespace);
    }
    return value;
}