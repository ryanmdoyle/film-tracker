const mongoose = require('mongoose');
const Roll = mongoose.model('Roll');
const Camera = mongoose.model('Camera');
const Photo = mongoose.model('Photo');
const User = mongoose.model('User');

exports.activeRolls = async (req, res) => {
  // If there is a user get active rolls, otherwise send to pug template without activeRolls
  if (req.user) {
    const rolls = await Roll.find({ active: true, owner: req.user.id });
    res.render('index', { title: 'Film Tracker', activeRolls: rolls }) 
  } else {
    res.render('index', { title: 'Film Tracker'}) 
  }
}

exports.getRoll = async (req, res) => {
  // get roll from params
  const roll = await Roll.find({ slug: req.params.rollslug })
  // get all photos assigned to the roll
  const photos = 
  res.render('roll', { roll, photos })
}

exports.addCameraForm = (req, res) => {
  res.render('addCamera', { title: "Add a Camera" })
}

exports.addCamera = async (req, res) => {
  const camera = await new Camera(req.body).save(); // saves the camera to the db

  const owner = await Camera.findByIdAndUpdate(
    camera._id, //find the current camera by their id
    { owner: req.user.id },
    { new: true } //return the new user, opposed to what you hade before the update
  );
  res.redirect('/'); //redirects to index, where current list of rolls are shown
}

exports.addPhotoForm = (req, res) => {
  res.render('addPhoto', { title: "Add Photo"} );
}

exports.addPhoto = async (req, res) => {
  const photo = await new Photo(req.body); // .save(); // don't save to a collection, save as array item to a Film roll
  const roll = await Roll.findOneAndUpdate(
    { slug: req.params.rollslug},
    { '$addToSet' : { photos: photo } },
    { new: true }
  )
  res.redirect('/');
}

exports.newRollForm = async (req, res) => {
  const cameras = await Camera.find( { owner : req.user.id} ) // find user (their cameras are contained in 'cameras' array)
  res.render('newRoll', { title: "Start a New Roll", cameras })
}

exports.newRoll = async (req, res) => {
  const roll = await new Roll(req.body);
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