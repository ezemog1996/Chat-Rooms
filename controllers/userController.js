const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
module.exports = {
    register: async function(req, res) {
        const profilePic = await req.file ? `${req.file.location}` : "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png";
        db.User.findOne({ username: req.body.username })
            .then(user => {

                if (user) return res.send("This username is already taken");

                db.User.create({ ...req.body, profilePic })
                    .then(newUser => res.send("You successfully created your account!"))
                    .catch(err => {
                        res.status(422).json(err)
                    });
                })
    },
    login: function(req, res) {
        db.User.findOne({ username: req.body.username })
            .then(user => {
                if (!user) return res.json({ message: "Username and password don't match" });

                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatches => {
                        if (!passwordMatches) return res.json({ message: "Username and password don't match" })
                        const jwtToken = jwt.sign({ _id: user._id }, process.env.jwt_secret);

                        res.cookie('token', jwtToken, { httpOnly: true, secure: true, sameSite: "Strict" }).json({
                            message: "You've been successfully logged in!",
                            _id: user._id,
                            username: user.username,
                            profilePic: user.profilePic,
                            chats: user.chats,
                            friends: user.friends
                        });
                    })
            })
            .catch(err => res.status(422).json(err));
    },
    logout: function(req, res) {
        res.cookie('token', '', { expires: new Date(0) }).send(`${req.user.username} has been successfully logged out!`)
    },
    findUser: function(req, res) {
        res.json({
            _id: req.user._id,
            username: req.user.username,
            profilePic: req.user.profilePic,
            chats: req.user.chats,
            friends: req.user.friends,
            message: "You're signed in"
        })
    },
    createRoom: function(req, res) {
        db.Chat.create({
            roomName: req.body.roomName,
            participants: req.body.participants
        })
            .then(room => {
                console.log(room.participants)
                db.User.findOneAndUpdate(
                    {
                        _id: req.user._id
                    },
                    {
                        $push: {
                            chats: {
                                _id: room._id,
                                roomName: room.roomName,
                                members: room.participants
                            }
                        }
                    },
                    {
                        new: true,
                        useFindAndModify: false
                    }
                ).then(user => res.json(room))
            })
            .catch(err => res.status(422).json(err));
    },
    addRoomToUser: function(req, res) {
        console.log(req.body.members)
        db.User.findOneAndUpdate(
            {
                _id: req.user._id
            },
            {
                $push: {
                    chats: {
                        _id: req.body._id,
                        roomName: req.body.roomName,
                        members: req.body.members
                    }
                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        )
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err))
    },
    findFriends: function(req, res) {
        db.User.find(
            {
                username: {
                    "$regex": `${req.params.username}`,
                    "$options": "i"
                },
                _id: {
                    $ne: req.user._id
                }
            },
            {
                password: 0,
                chats: 0
            }
        )
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err))
    },
    addFriend: function(req, res) {
        db.User.findOne(
            {
                _id: req.user._id,
            }
        )
        .then(user => {
            db.User.findOneAndUpdate(
                {
                    _id: user.id
                },
                {
                    $push: {
                        friends: {
                            username: req.body.username,
                            _id: req.body._id
                        }
                    }
                },
                {
                    new: true,
                    useFindAndModify: false
                }
            )
            .then(updatedUser => res.send(`You add ${req.body.username} as a friend!`))
            .catch(err => res.status(422).json(err))
        })
    },
    sendMessage: function(req, res) {
        db.Message.create(req.body)
            .then(message => res.json(message))
            .catch(err => res.status(422).json(err))
    }
}