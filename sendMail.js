const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const config = require('./config/mailDetails');

const oauth2Client = new OAuth2(config.googleClientId, // ClientID
    config.googleClientSecret, // Client Secret
    config.googleReDirectURL // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: config.refreshtoken
});
const accessToken = oauth2Client.getAccessToken();

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: config.user,
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
        refreshToken: config.refreshtoken,
        accessToken: accessToken
    }
});

module.exports = {
    smtpTransport: smtpTransport
};