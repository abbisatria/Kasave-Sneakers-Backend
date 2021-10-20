const User = require('./model')
const response = require('../../helpers/response')
const bcrypt = require('bcryptjs')

module.exports = {
  createUser: async (req, res) => {
    try {
      const payload = req.body

      const user = new User(payload)

      await user.save()

      delete user._doc.password

      return response(res, 201, true, 'User Successfully Created', user)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  updateUser: async (req, res) => {
    try {
      const payload = req.body

      const HASH_ROUND = 10
      payload.password = bcrypt.hashSync(payload.password, HASH_ROUND)

      const user = await User.findOneAndUpdate({
        _id: req.user._id
      }, payload, { new: true, runValidators: true })

      delete user._doc.password

      return response(res, 201, true, 'User Successfully Updated', user)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  }
}
