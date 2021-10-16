const express = require('express')
const router = express.Router()
const { isLoginUser } = require('../../middleware/auth')
const { createUser, updateUser } = require('./controller')

router.post('', createUser)
router.put('', isLoginUser, updateUser)

module.exports = router
