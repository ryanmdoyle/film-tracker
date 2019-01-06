var express = require('express');
var router = express.Router();

const cameraController = require('../controllers/cameraController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController')

const {catchErrors} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', catchErrors(cameraController.activeRolls));

router.get('/addCamera', cameraController.addCameraForm)
router.post('/addCamera', catchErrors(cameraController.addCamera));

router.get('/newRoll', catchErrors(cameraController.newRollForm));
router.post('/newRoll', catchErrors(cameraController.newRoll));

router.get('/newPhoto', cameraController.addPhotoForm);
router.post('/newPhoto', catchErrors(cameraController.addPhotoForm));

router.get('/login', userController.loginForm);
router.post('/login', authController.login, authController.welcome); //fix with async/await?

router.get('/logout', authController.logout);

router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister, 
  userController.register,
  authController.login,
  authController.welcome //fix with async/await?
);

router.get('/account', userController.account);

module.exports = router;
