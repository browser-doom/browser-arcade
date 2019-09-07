const socketio = require('socket.io');
const jsonRpcInvoke = require('./rpc').jsonRpcInvoke;

require('./api/example');

module.exports = (PORT, handler) => {
    const server = require('http').createServer(handler || ((req, res) => {
    }));
    const io = socketio(server, { path: '/api' });

    io.on('connection', function(socket) {
        const playerId = socket.id;
        const context = {
            player: { id: playerId }
        };

        socket.on('rpc', (message) => {
            jsonRpcInvoke(message, context, socket);
        });

        socket.on('disconnect', () => {
        });
    });

    server.listen(PORT);

    return server;
};