const Transaction = require('./model')
const Expense = require('../expense/model')
const response = require('../../helpers/response')
const sendEmail = require('../../helpers/sendEmail')

module.exports = {
  history: async (req, res) => {
    try {
      const { page, keyword } = req.query

      let criteria = {}

      if (keyword.length) {
        criteria = {
          ...criteria,
          orderId: { $regex: `${keyword}`, $options: 'i' }
        }
      }

      if (req.user._id) {
        criteria = {
          ...criteria,
          user: req.user._id
        }
      }

      const count = await Transaction.countDocuments(criteria)
      const history = await Transaction.find(criteria).sort({ updatedAt: -1 }).limit(5 * 1).skip((page - 1) * 5)

      const countBalance = await Transaction.aggregate([
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

      const totalPage = Math.ceil(Number(count) / 5)
      return response(
        res,
        200,
        true,
        'History Transactions',
        {
          data: history,
          count: countBalance.length > 0 ? countBalance[0].total : 0
        },
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
      const countExpense = await Expense.aggregate([
        {
          $group: {
            _id: '$id',
            total: { $sum: '$price' }
          }
        }
      ])

      const history = await Transaction.find({ user: req.user._id }).sort({ updatedAt: -1 }).limit(5 * 1).skip((1 - 1) * 5)

      const results = {
        count: count.length > 0 ? (countExpense.length > 0 ? (count[0].total - countExpense[0].total) : count[0].total) : 0,
        history
      }

      return response(res, 200, true, 'Dashboard', results)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  checkout: async (req, res) => {
    try {
      const { total, paid, change, item, email, discount } = req.body

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
        status: 'success',
        email: email,
        discount: discount
      }

      const transaction = new Transaction(payload)

      await transaction.save()

      const orderId = transaction._id.toString()

      function formatRupiah (angka, prefix) {
        const resultAngka = angka.toString()
        const numberString = resultAngka.replace(/[^,\d]/g, '').toString()
        const split = numberString.split(',')
        const sisa = split[0].length % 3
        let rupiah = split[0].substr(0, sisa)
        const ribuan = split[0].substr(sisa).match(/\d{3}/gi)

        if (ribuan) {
          const separator = sisa ? '.' : ''
          rupiah += separator + ribuan.join('.')
        }

        rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
        return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : ''
      }

      const resultEmail = {
        historyItem: item.map(val => {
          return {
            category: {
              name: val.category.name
            },
            subCategory: {
              name: val.subCategory.name,
              price: formatRupiah(val.subCategory.price)
            },
            treatment: {
              name: val.treatment.name,
              price: formatRupiah(val.treatment.price)
            },
            name: val.name,
            discount: val.discount,
            description: val.description,
            oneDay: val.oneDay,
            total: formatRupiah(val.total)
          }
        }),
        total: formatRupiah(total),
        paid: formatRupiah(paid),
        change: formatRupiah(change)
      }

      sendEmail(email, `Transactions #${orderId.substring(orderId.length - 6, orderId.length)}`, 'Thanks for transaction', { resultEmail, orderId: `#${orderId.substring(orderId.length - 6, orderId.length)}` })

      await Transaction.findOneAndUpdate({ _id: transaction._id }, { ...payload, orderId: `#${orderId.substring(orderId.length - 6, orderId.length)}` })

      return response(res, 200, true, 'Transaction Success', transaction)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  }
}
