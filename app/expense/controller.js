const Expense = require('./model')
const response = require('../../helpers/response')

module.exports = {
  getExpense: async (req, res) => {
    try {
      const { page, keyword } = req.query
      const criteria = {
        item: { $regex: `${keyword}`, $options: 'i' }
      }
      const count = await Expense.countDocuments(criteria)
      const history = await Expense.find(criteria).sort({ updatedAt: -1 }).limit(5 * 1).skip((page - 1) * 5)

      const countBalance = await Expense.aggregate([
        {
          $group: {
            _id: '$id',
            total: { $sum: '$price' }
          }
        }
      ])

      const totalPage = Math.ceil(Number(count) / 5)

      return response(res, 200, true, 'List Expense', {
        data: history,
        count: countBalance.length > 0 ? countBalance[0].total : 0
      },
      {
        totalData: count,
        currentPage: page,
        totalPage
      })
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  getDetailExpense: async (req, res) => {
    try {
      const { id } = req.params

      const expense = await Expense.findOne({ _id: id })
      if (expense) {
        return response(res, 200, true, `Detail Expense id: ${id}`, expense)
      } else {
        return response(res, 404, true, 'Expense Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  createExpense: async (req, res) => {
    try {
      const payload = req.body

      const expense = await Expense(payload)
      await expense.save()

      return response(res, 200, true, 'Expense Successfully Created', Expense)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  updateExpense: async (req, res) => {
    try {
      const { id } = req.params
      const payload = req.body

      await Expense.findOneAndUpdate({
        _id: id
      }, payload)

      return response(res, 200, true, 'Expense Successfully Updated', payload)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params

      const expense = await Expense.findOne({ _id: id })
      if (expense) {
        const expense = await Expense.findByIdAndRemove({
          _id: id
        })
        return response(res, 200, true, 'Expense Successfully Deleted', expense)
      } else {
        return response(res, 404, true, 'Expense Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  }
}
