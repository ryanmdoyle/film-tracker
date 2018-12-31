var express = require('express');
var router = express.Router();

const cameraController = require('../controllers/cameraController')

const {catchErrors} = require('../handlers/errorHandlers');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addCamera', cameraController.addCameraForm)
router.post('/addCamera', catchErrors(cameraController.addCamera));

router.get('/newRoll', catchErrors(cameraController.newRollForm));
router.post('/newRoll', catchErrors(cameraController.newRoll))

module.exports = router;
