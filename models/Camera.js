const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cameraSchema = new mongoose.Schema({
  brand: {
    type: String, 
    required: "Please enter the brand name of your camera.  Example: Canon, Nikon, Sony, etc."
  },
  model: {
    type: String,
    required: "Please enter the name of your camera model"
  },
  format: {
    type: String,
    required: "Please enter the format of this camera. 35mm, medium, large"
  }
});

module.exports = mongoose.model('Camera', cameraSchema);