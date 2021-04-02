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
                            username: user.username,
                            profilePic: user.profilePic
                        });
                    })
            })
            .catch(err => res.status(422).json(err));
    },
    findUser: function(req, res) {
        res.json({
            username: req.user.username,
            profilePic: req.user.profilePic,
            chats: req.user.chats,
            message: "You're signed in"
        })
    },
    createRoom: function(req, res) {
        db.Chat.create(req.body)
            .then(room => res.json(room))
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            });
    }
}