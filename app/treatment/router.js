const express = require('express')
const { isLoginUser } = require('../../middleware/auth')
const router = express.Router()
const { createTreatment, getTreatment, updateTreatment, deleteTreatment } = require('./controller')

router.get('/detail/:id', isLoginUser, getTreatment)
router.post('', isLoginUser, createTreatment)
router.put('/:id', isLoginUser, updateTreatment)
router.delete('/:id', isLoginUser, deleteTreatment)

module.exports = router
