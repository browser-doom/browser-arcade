const WebsocketServer = require('websocket').server;

module.exports = (PORT, handler) => {
    const server = require('http').createServer(handler || ((req, res) => {
    }));
    server.listen(PORT);

    const websocketServer = new WebsocketServer({ httpServer: server });
    websocketServer.on('request', function(request) {
        const connection = request.accept(null, request.origin);
        connection.on('message', (message) => {
            connection.send('test');
        });
        connection.on('close', (connection) => {
        });
    });
};