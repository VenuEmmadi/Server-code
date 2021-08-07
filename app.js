const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = 'YOUR CLIENT ID';
const CLEINT_SECRET = 'KEEP YOUR CLIENT SECRET';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'KEEP YOUR REFRESH TOKEN';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//Function to send Email.
async function sendMail() {
  try {
	//We are creating Token fly i.e creating access token whenever is required.
    const accessToken = await oAuth2Client.getAccessToken(); //getting access token
	
    const transport = nodemailer.createTransport({ 
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'yours authorised email address',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
	//Creating Options to the mail before sending.
    const mailOptions = {
      from: 'SENDER NAME <yours authorised email address@gmail.com>',
      to: 'to email address here',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

// sending the mail using promices.
sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));