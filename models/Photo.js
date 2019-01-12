const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const uniqueSlug = require('unique-slug');

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
  slug: String
})

photoSchema.pre('save', async function(next) {
  if (this.date === null) {
    this.date = await Date.now();
  }
  this.slug = await uniqueSlug(this.date.toString())
  next();
});

module.exports = mongoose.model("Photo", photoSchema)