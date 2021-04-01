const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
module.exports = {
    register: function(req, res) {
        console.log(req.file)
        console.log(req.body)
        db.User.create({ ...req.body, profilePic: `${req.file.destination}/${req.file.filename}` })
            .then(user => res.json(user))
            .catch(err => {
                console.log(err)
                res.status(422).json(err)
            });
    },
    login: function(req, res) {
        db.User.findOne({ username: req.body.username })
            .then(user => {
                if (!user) return res.send("Username and password don't match");

                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatches => {
                        if (!passwordMatches) return res.send("Username and password don't match")
                        
                        const jwtToken = jwt.sign({ _id: user._id }, process.env.jwt_secret);

                        res.cookie('token', jwtToken, { httpOnly: true, secure: true, sameSite: "Strict" }).send("You've been successfully logged in!");
                    })
            })
            .catch(err => res.status(422).json(err));
    },
    findUser: function(req, res) {
        res.json(req.user)
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