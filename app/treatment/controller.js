const Treatment = require('./model')
const response = require('../../helpers/response')

module.exports = {
  getTreatment: async (req, res) => {
    try {
      const treatment = await Treatment.find()
      return response(res, 200, true, 'List Treatment', treatment)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  getDetailTreatment: async (req, res) => {
    try {
      const { id } = req.params

      const treatment = await Treatment.findOne({ _id: id })
      if (treatment) {
        return response(res, 200, true, `Detail Treatment id: ${id}`, treatment)
      } else {
        return response(res, 404, true, 'Treatment Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  createTreatment: async (req, res) => {
    try {
      const payload = req.body

      const treatment = await Treatment(payload)
      await treatment.save()

      return response(res, 200, true, 'Treatment Successfully Created', treatment)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  updateTreatment: async (req, res) => {
    try {
      const { id } = req.params
      const payload = req.body

      await Treatment.findByIdAndUpdate({
        _id: id
      }, payload)

      return response(res, 200, true, 'Treatment Successfully Updated', payload)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  deleteTreatment: async (req, res) => {
    try {
      const { id } = req.params

      const treatment = await Treatment.findOne({ _id: id })
      if (treatment) {
        const treatment = await Treatment.findByIdAndRemove({
          _id: id
        })
        return response(res, 200, true, 'Treatment Successfully Deleted', treatment)
      } else {
        return response(res, 404, true, 'Treatment Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  }
}
