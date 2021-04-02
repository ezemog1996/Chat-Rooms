const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = function(req, res, next) {
    const cookie = req.headers.cookie;
    if (!cookie) return res.send('You need to sign in');
    
    const token = jwt.verify(cookie.split('=')[1], process.env.jwt_secret);
    
    db.User.findById(token._id, { password: 0, _id:0 })
        .then(user => {
            if (!user) return res.send('You need to sign in');

            req.user = user;
            next();
        });
}