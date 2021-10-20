const express = require('express')
const { isLoginUser } = require('../../middleware/auth')
const router = express.Router()
const { createCategory, getCategory, updateCategory, deleteCategory } = require('./controller')

router.get('/detail/:id', isLoginUser, getCategory)
router.post('', isLoginUser, createCategory)
router.put('/:id', isLoginUser, updateCategory)
router.delete('/:id', isLoginUser, deleteCategory)

module.exports = router
