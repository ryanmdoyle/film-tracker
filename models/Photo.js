const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const photoSchema = new mongoose.Schema({
  shutter: {
    type: String, 
    required: "Please enter a shutter speed."
  },
  fstop: {
    type: Number, 
    required: "Please enter an f-stop value."
  },
  focalLength: {
    type: Number
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Photo", photoSchema)