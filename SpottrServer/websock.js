const app = require('./server').app;
const config = require('./config')
const http = require('http').Server(app)
const io = require('socket.io')(http)

const SOCK_PORT = config.socketPort

// io.on('connection', function connection(ws) {
//     console.log('new client')
// })

exports.broadcastSockMsg = (channel, msg) => {

    io.sockets.emit(channel, msg)
}

http.listen(SOCK_PORT, () => {console.log(`WebSockets listening on port ${SOCK_PORT}`)})