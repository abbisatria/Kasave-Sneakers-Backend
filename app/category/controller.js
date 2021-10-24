const Category = require('./model')
const response = require('../../helpers/response')

module.exports = {
  getCategory: async (req, res) => {
    try {
      const category = await Category.find()
      return response(res, 200, true, 'List Category', category)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  getDetailCategory: async (req, res) => {
    try {
      const { id } = req.params

      const category = await Category.findOne({ _id: id })
      if (category) {
        return response(res, 200, true, `Detail Category id: ${id}`, category)
      } else {
        return response(res, 404, true, 'Category Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  createCategory: async (req, res) => {
    try {
      const payload = req.body

      const category = await Category(payload)
      await category.save()

      return response(res, 200, true, 'Category Successfully Created', category)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params
      const payload = req.body

      await Category.findOneAndUpdate({
        _id: id
      }, payload)

      return response(res, 200, true, 'Category Successfully Updated', payload)
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params

      const category = await Category.findOne({ _id: id })
      if (category) {
        const category = await Category.findByIdAndRemove({
          _id: id
        })
        return response(res, 200, true, 'Category Successfully Deleted', category)
      } else {
        return response(res, 404, true, 'Category Not Found')
      }
    } catch (err) {
      return response(res, 400, false, `${err.message || 'Bad Request'}`)
    }
  }
}
