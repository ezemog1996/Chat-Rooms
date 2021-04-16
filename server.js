require('dotenv').config();
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require("mongoose");
const { Message } = require('./models');
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
};

app.use(routes);

mongoose.connect(
    "mongodb+srv://ezemog1996:" + process.env.MONGO_PASSWORD + "@cluster0.ph94g.mongodb.net/galindo_gomez_chat_rooms?retryWrites=true&w=majority",
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
})

io.on('connection', socket => {
    // console.log(`Connected socket: ${socket}`);
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on('message', message => {
        message.participants.forEach(participant => {
            console.log(message)
            socket.broadcast.to(participant._id).emit('message', message.message)
        })
    })
    
    socket.on('disconnect', () => {
        console.log('disconnected')
    })
})