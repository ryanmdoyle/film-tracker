// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// exports moment.js for templates, etc
exports.moment = require('moment');

// the site name to use everywhere
exports.siteName = 'Film Tracker';

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);
