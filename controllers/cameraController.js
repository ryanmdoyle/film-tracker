const mongoose = require('mongoose');
const Film = mongoose.model('Film');
const Camera = mongoose.model('Camera');
const Photo = mongoose.model('Photo');

exports.activeRolls = async (req, res) => {
  const rolls = await Film.find({active: true});
  res.render('index', { title: 'Film Tracker', activeRolls: rolls })
}

exports.addCameraForm = (req, res) => {
  res.render('addCamera', { title: "Add a Camera" })
}

exports.addCamera = async (req, res) => {
  const camera = await new Camera(req.body).save();
  res.send(req.body);
  // render the home with the list of active rolls, flash to add a roll to that camera
}

exports.addPhotoForm = (req, res) => {
  res.render('addPhoto', { title: "Add Photo"} );
}

exports.addPhoto = async (req, res) => {
  const photo = await new Photo(eq.body).save();
  res.redirect('index');
}

exports.newRollForm = async (req, res) => {
  const cameras = await Camera.find({})
  res.render('newRoll', { title: "Start a New Roll", cameras })
}

exports.newRoll = async (req, res) => {
  const roll = await new Film(req.body).save();
  // add a flash to alert that a new roll has been created
  // add logic in case there is an error
  res.redirect('index');
}

exports.login = (req, res) => {
  res.render('login', { title: "Login to Film Tracker"});
}