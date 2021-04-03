const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        roomId: {
            type: String,
            required: true
        },
        sender: {
            username: {
                type: String,
                required: true
            },
            _id: {
                type: String,
                required: true
            }
        },
        message: {
            type: String,
            required: true
        },
        sentOn: {
            type: Date,
            default: Date.now(),
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;