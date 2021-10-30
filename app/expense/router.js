const express = require('express')
const { isLoginUser } = require('../../middleware/auth')
const router = express.Router()
const { createExpense, getDetailExpense, updateExpense, deleteExpense, getExpense } = require('./controller')

router.get('/listExpense', isLoginUser, getExpense)
router.get('/detail/:id', isLoginUser, getDetailExpense)
router.post('', isLoginUser, createExpense)
router.put('/:id', isLoginUser, updateExpense)
router.delete('/:id', isLoginUser, deleteExpense)

module.exports = router
