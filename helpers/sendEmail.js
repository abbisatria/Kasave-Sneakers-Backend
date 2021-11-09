const mailer = require('nodemailer')
const fs = require('fs')
const mustache = require('mustache')
const path = require('path')
const { EMAIL_USER, EMAIL_PASS } = process.env

module.exports = async (email, subject, message, data) => {
  const template = fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf-8')

  const transporter = mailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  })

  const results = {
    subject: subject,
    message: message,
    data: data.resultEmail
  }

  console.log(results)

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: subject,
    html: mustache.render(template, { ...results })
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err
    console.log('Email sent: ' + info.response)
  })
}
