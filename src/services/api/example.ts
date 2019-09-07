import jsonRpcWrapApi from "../rpc";

export default jsonRpcWrapApi({
    getPlayerId(): string { throw new Error('not implemented') }
}, 'example');