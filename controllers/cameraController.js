const mongoose = require('mongoose');
const Film = mongoose.model('Film');
const Camera = mongoose.model('Camera');

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

exports.addLensForm = (req, res) => {
  res.render('addCamera', { title: "Add a Camera" })
}

exports.addLens = (req, res) => {
  res.send(req.body);
  // render the home with the list of active rolls, flash to add a roll to that camera
}

exports.newRollForm = async (req, res) => {
  const cameras = await Camera.find({})
  // res.send(cameras);
  res.render('newRoll', { title: "Start a New Roll", cameras })
}

exports.newRoll = async (req, res) => {
  const roll = await new Film(req.body).save();
  res.redirect('newRoll');
}

exports.loadFilm = (req, res) => {
  res.send(req.body);
}

exports.login = (req, res) => {
  res.render('login', { title: "Login to Film Tracker"});
}