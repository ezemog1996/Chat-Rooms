const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        roomName: {
            type: String
        },
        participants: [{
            username: {
                type: String,
                required: true
            }
        }]
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;