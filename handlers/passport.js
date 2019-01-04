// Passport JS handles logins
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy()); // CHANGE: USE "createStrategy" INSTEAD OF "authenticate"

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());