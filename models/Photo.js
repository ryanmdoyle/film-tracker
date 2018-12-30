const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const photoSchema = new mongoose.Schema({
  Shutter: {
    type: Number, 
    required: "Please enter a shutter speed."
  },
  Fstop: {
    type: Number, 
    required: "Please enter an f-stop value."
  },
  Notes: Number,
  Date: Date,
  Time: Date
})

module.exports = mongoose.model("Photo", photoSchema)