require('dotenv').config();
const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
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
    app.listen(PORT, () => {
        console.log(`🌎 ==> API Server now listening on PORT ${PORT}`)
    })
})