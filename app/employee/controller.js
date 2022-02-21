const Employee = require('./model')
const response = require('../../helpers/response')

module.exports = {
  listEmployee: async (req, res) => {
    try {
      const { page, keyword, show } = req.query

      let criteria = {}

      if (keyword) {
        criteria = {
          ...criteria,
          name: { $regex: `${keyword}`, $options: 'i' }
        }
      }

      const count = await Employee.countDocuments(criteria)
      const result = await Employee.find(criteria).sort({ updatedAt: -1 }).limit(show * 1).skip((page - 1) * show)

      const totalPage = Math.ceil(Number(count) / show)
      return response(
        res,
        200,
        true,
        'List Employee',
        result,
        {
          totalData: count,
          currentPage: Number(page),
          totalPage
        }
      )
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  getDetailEmployee: async (req, res) => {
    try {
      const { id } = req.params

      const employee = await Employee.findOne({ _id: id })
      if (employee) {
        return response(res, 200, true, `Detail Employee id: ${id}`, employee)
      } else {
        return response(res, 404, true, 'Employee Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  createEmployee: async (req, res) => {
    try {
      const payload = req.body

      const employee = await Employee(payload)
      await employee.save()

      return response(res, 200, true, 'Employee Successfully Created', employee)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params
      const payload = req.body

      await Employee.findOneAndUpdate({
        _id: id
      }, payload)

      return response(res, 200, true, 'Employee Successfully Updated', payload)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params

      const employee = await Employee.findOne({ _id: id })
      if (employee) {
        const employee = await Employee.findByIdAndRemove({
          _id: id
        })
        return response(res, 200, true, 'Employee Successfully Deleted', employee)
      } else {
        return response(res, 404, true, 'Employee Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  }
}
