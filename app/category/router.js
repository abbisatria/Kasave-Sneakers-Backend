const express = require('express')
const { isLoginUser } = require('../../middleware/auth')
const router = express.Router()
const { createCategory, getDetailCategory, updateCategory, deleteCategory, getCategory } = require('./controller')

router.get('/listCategory', isLoginUser, getCategory)
router.get('/detail/:id', isLoginUser, getDetailCategory)
router.post('', isLoginUser, createCategory)
router.put('/:id', isLoginUser, updateCategory)
router.delete('/:id', isLoginUser, deleteCategory)

module.exports = router
