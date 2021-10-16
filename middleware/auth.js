const config = require('../config')
const jwt = require('jsonwebtoken')
const User = require('../app/users/model')
const response = require('../helpers/response')

module.exports = {
  isLoginUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null

      const data = jwt.verify(token, config.jwtKey)

      const user = await User.findOne({ _id: data.user.id })

      if (!user) {
        throw new Error()
      }

      req.user = user
      req.token = token
      next()
    } catch (err) {
      return response(res, 401, false, 'Not authorized to acces this resource')
    }
  }
}
