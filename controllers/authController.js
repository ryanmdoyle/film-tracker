const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const crypto = require('crypto');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.welcome = (req, res) => {
  req.redirect('/');
}

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }
  req.flash('error', 'Oops you must be logged in to do that!');
  res.redirect('/login');
};

exports.forgot = async (req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'No account with that email exists.');
    return res.redirect('/login');
  }
  // 2. Set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL
  });
  req.flash('success', `You have been emailed a password reset link.`);
  // 4. redirect to login page
  res.redirect('/login');
};

exports.resetForm = async (req, res) => {
  const user = await User.findOne({ 
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt : Date.now() }
  });
  
  if (!user) {
    req.flash('error', 'Link has expired!')
    return res.redirect('/');
  }

  res.render('/resetForm', { title: 'Reset your Password', user } );
}

exports.resetPassword = async (req, res) => {
  const user = await User.findOn({
    _id: req.user._id,
    resetPasswordExpires: { $gt: Date.now()}
  });
  
  // const setPassword = promisify(user.setPassword, user);
  // await setPassword(req.body.password);
  // user.resetPasswordToken = undefined;
  // user.resetPasswordExpires = undefined;
  // const updatedUser = await user.save();
  // await req.login(updatedUser);
  // req.flash('success', '💃 Nice! Your password has been reset! You are now logged in!');
  // res.redirect('/');
}