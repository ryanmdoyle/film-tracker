const mongoose = require('mongoose');
const Film = mongoose.model('Film');
const Camera = mongoose.model('Camera');
const Photo = mongoose.model('Photo');
const User = mongoose.model('User');

exports.activeRolls = async (req, res) => {
  const rolls = await Film.find({active: true});
  res.render('index', { title: 'Film Tracker', activeRolls: rolls })
}

exports.addCameraForm = (req, res) => {
  res.render('addCamera', { title: "Add a Camera" })
}

exports.addCamera = async (req, res) => {
  const camera = await new Camera(req.body).save(); // saves the camera to the db
  const user = await User.findByIdAndUpdate(
    req.user.id, //find the current user by their id
    { '$addToSet': { cameras: camera } }, //$pull(remove) or $addToSet(add to array) the camera
    { new: true } //return the new user, opposed to what you hade before the update
  );
  res.redirect('/'); //redirects to index, where current list of rolls are shown
}

exports.addPhotoForm = (req, res) => {
  res.render('addPhoto', { title: "Add Photo"} );
}

exports.addPhoto = async (req, res) => {
  const photo = await new Photo(eq.body).save();
  res.redirect('index');
}

exports.newRollForm = async (req, res) => {
  const cameras = await Camera.find({}) //add query for only the users cameras
  res.render('newRoll', { title: "Start a New Roll", cameras })
}

exports.newRoll = async (req, res) => {
  // const roll = await new Film(req.body).save();
  // // add a flash to alert that a new roll has been created
  // // add logic in case there is an error
  // res.redirect('index');

  const roll = await new Film(req.body);
  roll.owner = req.user.id;
  await roll.save();
  const user = await User.findByIdAndUpdate(
    req.user.id, //find the current user by their id
    { '$addToSet' : { rolls: roll } }, //$pull(remove) or $addToSet(add to array) the roll
    { new: true } //return the new user, opposed to what you hade before the update
  );
  res.redirect('/'); //redirects to index, where current list of rolls are shown
}

exports.login = (req, res) => {
  res.render('login', { title: "Login to Film Tracker"});
}