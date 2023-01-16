import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { activateEmailTemplate } from '../emails/activateEmailTemplate'

const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// Send email
export const sendEmail = async (to, url, subject, text) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
  })
  const accessToken = await oauth2Client.getAccessToken()
  console.log(accessToken, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

  // From nodemailer
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN.replace(/\n/g,""),
      accessToken: accessToken.token,
    }
  })

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to,
    subject,
    html: activateEmailTemplate(to, url)
  }

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      return err
    }
    console.log(info)
    return info
})
}
