let express = require('express')
let app = express()

let http = require('http')
let server = http.Server(app)

let socketIO = require('socket.io')
let io = socketIO(server,{
    cors: {
        origin: "http://localhost:4200"
    }
})

const port = process.env.PORT || 3000

io.on('connection', (socket) => {
    console.log('user connected')
    socket.broadcast.emit('new-message', "new user joined")
    socket.on('new-message', (message) => {
        console.log(message)
        socket.broadcast.emit('new-message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

app.get('/', (req, res) => {
    res.send('success');
});

server.listen(port, () => {
    console.log(`started on port : ${port}`)
})