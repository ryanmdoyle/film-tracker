const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// const Camera = require('./Camera');

const filmSchema = new mongoose.Schema({
  camera: {
    type: String, //chnage ot the model later
    required: 'Please select a camera this film will be used in.'
  },
  filmBrand: {
    type: String,
    required: 'Please enter the brand of film.'
  },
  filmName: {
    type: String,
    required: 'Please enter the name of the film.'
  },
  iso: {
    type: Number,
    required: "Please enter the film speed, like ISO/ASA"
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  photos: [
    { type: mongoose.Schema.ObjectId, ref: 'Photo' }
  ],
  owner: {
    type: mongoose.Schema.ObjectId, ref: "User"
  }
}, 
{
  toJSON: { virtuals: true }, // pulls in data from the reviews virtual field if the data is being parsed to JSON or Object
  toObject: { virtuals: true }
});

filmSchema.pre('save', async function(next) {
  if (this.date === null) {
    this.date = await Date.now();
  }
  next();
});

module.exports = mongoose.model('Film', filmSchema);