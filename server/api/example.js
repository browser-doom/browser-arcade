const jsonRpcWrapApi = require('../rpc').jsonRpcWrapApi;

const api = {
    getPlayerId() {
        return this.player.id;
    }
};

module.exports = jsonRpcWrapApi(api, 'example');