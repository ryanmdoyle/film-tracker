const pug = require('pug');
const juice = require('juice'); //inlines all css for the html emails (html email has to be inline)
const htmlToText = require('html-to-text'); //converts html to plain text

const postmark = require('postmark');
var client = new postmark.ServerClient(process.env.MAIL_SERVER);

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options); //__dirname is a Node variable that represents the working directory
  const inlineCSS = juice(html);
  return inlineCSS;
}

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    "From": `Ryan Doyle 🖥️ <ryan@doylecodes.com>`,
    "To": options.user.email,
    "Subject": options.subject,
    "TextBody": text //add in plain text somehow?
  };
  
  return client.sendEmail(mailOptions);
}