const express = require('express')
const router = express.Router()
const { createCategory, getCategory, updateCategory, deleteCategory } = require('./controller')

router.get('/detail/:id', getCategory)
router.post('', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)

module.exports = router
