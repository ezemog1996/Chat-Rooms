const router = require('express').Router();
const userController = require('../../controllers/userController');
const authenticate = require('../../config/authenticate');
const upload = require('../../config/multer');

router.route('/register')
    .post(upload.single('profilePic'), userController.register);

router.route('/login')
    .post(upload.single('profilePic'), userController.login);

router.route('/logout')
    .get(authenticate, userController.logout);
router.route('/finduser')
    .get(authenticate, userController.findUser);

router.route('/findfriends/:username')
    .get(authenticate, userController.findFriends);

router.route('/addfriend')
    .post(authenticate, upload.single(''), userController.addFriend);

router.route('/chatroom')
    .post(authenticate, upload.single(''), userController.createRoom);

module.exports = router;