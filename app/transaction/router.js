const express = require('express')
const { isLoginUser } = require('../../middleware/auth')
const { checkout, dashboard, history, detail } = require('./controller')
const router = express.Router()

router.post('/checkout', isLoginUser, checkout)
router.get('/dashboard', isLoginUser, dashboard)
router.get('/detailTransaction/:id', isLoginUser, detail)
router.get('', isLoginUser, history)

module.exports = router
