const User = require('../users/model')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const response = require('../../helpers/response')

module.exports = {
  signin: (req, res, next) => {
    const { email, password } = req.body

    User.findOne({ email: email }).then((user) => {
      if (user) {
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (checkPassword) {
          const token = jwt.sign({
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              nama: user.name,
              phoneNumber: user.phoneNumber
            }
          }, config.jwtKey)

          return response(res, 200, true, 'Login Successfully', token)
        } else {
          return response(res, 403, false, 'Wrong Password')
        }
      } else {
        return response(res, 403, false, 'Email Not Registered')
      }
    }).catch((err) => {
      response(res, 500, false, `${err.message || 'Bad Request'}`)

      next()
    })
  }
}
