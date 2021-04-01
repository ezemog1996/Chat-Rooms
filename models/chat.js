const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
        roomName: {
            type: String
        },
        participants: [{
            type: String,
        }],
        messages: [{
            sender: {
                type: String
            },
            message: {
                type: String
            },
            sentOn: {
                type: Date,
                default: Date.now()
            }
        }]
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;