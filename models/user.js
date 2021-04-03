const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            required: 'Please enter a username',
            unique: true
        },
        password: {
            type: String,
            required: 'Please enter a password'
        },
        profilePic: {
            type: String,
            trim: true,
            default: "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png"
        },
        chats: [{
            roomName: {
                type: String
            },
            members: [{
                username: {
                    type: String,
                    required: true
                }
            }]
        }],
        friends: [{
            username: {
                type: String,
                required: true
            },
            _id: {
                type: String,
                required: true
            }
        }]
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;