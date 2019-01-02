var express = require('express');
var router = express.Router();

const cameraController = require('../controllers/cameraController')
const userController = require('../controllers/userController')

const {catchErrors} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', catchErrors(cameraController.activeRolls));

router.get('/addCamera', cameraController.addCameraForm)
router.post('/addCamera', catchErrors(cameraController.addCamera));

router.get('/newRoll', catchErrors(cameraController.newRollForm));
router.post('/newRoll', catchErrors(cameraController.newRoll));

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister, userController.register)

module.exports = router;
