const static = require('node-static');
const file = new static.Server('./build');


const PORT = 'PORT' in process.env ? process.env['PORT'] : '8092';

const startApiServer = require('./start');
startApiServer(PORT, (req, res) => {
    if(req.headers['upgrade'] !== 'websocket') {
        req.addListener('end', function () {
            file.serve(req, res);
        }).resume();
    }
});