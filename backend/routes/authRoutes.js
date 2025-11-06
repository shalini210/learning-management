const express = require('express');
const authController = require("../controllers/authController")
// const { signup, login, refreshToken, logout } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/verifyOtp', authController.verifyOtp);
// router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.post('/token', refreshToken);
// router.post('/logout', logout);

module.exports = router;
