const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uniqueSlug = require('unique-slug');

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
  },
  slug: String
});

// A function to check the slug and add number if it already exists (so all cameras have unique slug)
cameraSchema.pre('save', async function(next) {
  this.slug = await uniqueSlug(this.name)
  next();
});

module.exports = mongoose.model('Camera', cameraSchema);