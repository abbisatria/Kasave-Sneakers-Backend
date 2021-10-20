const Transaction = require('./model')
const response = require('../../helpers/response')

module.exports = {
  history: async (req, res) => {
    try {
      const { page } = req.query
      const count = await Transaction.countDocuments({ user: req.user._id })
      const history = await Transaction.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(5 * 1).skip((page - 1) * 5)

      const totalPage = Math.ceil(Number(count) / 5)
      return response(
        res,
        200,
        true,
        'History Transactions',
        history,
        {
          totalData: count,
          currentPage: page,
          totalPage
        }
      )
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params

      const transaction = await Transaction.findOne({ _id: id })

      if (transaction) {
        return response(res, 200, true, `Detail Transaction id: ${id}`, transaction)
      } else {
        return response(res, 404, false, 'Transaction Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  dashboard: async (req, res) => {
    try {
      const count = await Transaction.aggregate([
        {
          $match: { user: req.user._id }
        },
        {
          $group: {
            _id: '$user',
            total: { $sum: '$total' }
          }
        }
      ])
      const history = await Transaction.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(5 * 1).skip((1 - 1) * 5)

      const results = {
        count: count.length > 0 ? count[0].total : 0,
        history
      }

      return response(res, 200, true, 'Dashboard', results)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  checkout: async (req, res) => {
    try {
      const { total, paid, change, item } = req.body

      const payload = {
        historyUser: {
          name: req.user.name,
          phoneNumber: req.user.phoneNumber
        },
        historyItem: item,
        user: req.user._id,
        total: total,
        paid: paid,
        change: change,
        status: 'success'
      }

      const transaction = new Transaction(payload)

      await transaction.save()

      return response(res, 200, true, 'Transaction Success', transaction)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  }
}