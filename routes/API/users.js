const router = require('express').Router();
const userController = require('../../controllers/userController');
const authenticate = require('../../config/authenticate');
const upload = require('../../config/multer');

router.route('/register')
    .post(upload.single('profilePic'), userController.register);

router.route('/login')
    .post(upload.single('profilePic'), userController.login);

router.route('/finduser')
    .get(authenticate, userController.findUser);

// router.route('/authorize')
//     .get(userController.isAuthorized);

router.route('/chatroom')
    .post(authenticate, userController.createRoom);

module.exports = router;