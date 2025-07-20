const express = require("express")
const { register, profile } = require('../controllers/authController')
const verifyFirebaseToken = require('../middleware/auth')

const router = express.Router();

router.post('/register', register);
router.post('/profile', verifyFirebaseToken, profile)

module.exports = router;