var express = require('express');
var router = express.Router();

const cameraController = require('../controllers/cameraController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')

const {catchErrors} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', catchErrors(cameraController.activeRolls));

// Adding Cameras
router.get('/addCamera', catchErrors(cameraController.addCameraForm));
router.post('/addCamera', catchErrors(cameraController.addCamera));

// Adding/Finishing Rolls
router.get('/newRoll', catchErrors(cameraController.newRollForm));
router.post('/newRoll', catchErrors(cameraController.newRoll));
router.post('/:rollSlug/roll/finish', catchErrors(cameraController.finishRoll));

// Adding Photos to Rolls
router.get('/:rollSlug/addPhoto', cameraController.addPhotoForm);
router.post('/:rollSlug/addPhoto', catchErrors(cameraController.addPhoto));

// View for an individual roll
router.get('/:rollSlug/roll', cameraController.getRoll)

// Logins / Logout
router.get('/login', userController.loginForm);
router.post('/login', 
  authController.login, 
  authController.welcome)
; //fix with async/await?
router.get('/logout', authController.logout);

//Password Reset links
router.post('/forgot', catchErrors(authController.forgot))
router.get('/reset/:token', catchErrors(authController.resetForm))
router.post('/reset/:token', catchErrors(authController.resetPassword))

router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister, 
  userController.register,
  authController.login,
  authController.welcome //fix with async/await?
);

router.get('/account', userController.account);

module.exports = router;
