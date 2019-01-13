// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// exports moment.js for templates, etc
exports.moment = require('moment');

// the site name to use everywhere
exports.siteName = 'Roll Tracker';

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);