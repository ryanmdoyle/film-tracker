const mongoose = require('mongoose');
const Film = mongoose.model('Film');

exports.addCameraForm = (req, res) => {
  res.render('addCamera', { title: "Add a Camera" })
}

exports.addCamera = (req, res) => {
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

exports.newRollForm = (req, res) => {
  res.render('newRoll', { title: "Start a New Roll"} )
}

exports.newRoll = async (req, res) => {
  const roll = await new Film(req.body).save();
  res.redirect('newRoll');
}

exports.loadFilm = (req, res) => {
  res.send(req.body);
}