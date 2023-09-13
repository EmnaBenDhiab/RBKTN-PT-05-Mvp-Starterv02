const router = require('express').Router();
const _ = require('../controllers/AuthController');


// sign up route
router.post('/register', _.callSignup);

// sign in route
router.post('/login', _.callSignin);

// sign ouy route
router.delete('/logout', _.callSignout);

module.exports = router;