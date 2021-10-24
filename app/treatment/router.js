const express = require('express')
const { isLoginUser } = require('../../middleware/auth')
const router = express.Router()
const { createTreatment, getDetailTreatment, updateTreatment, deleteTreatment, getTreatment } = require('./controller')

router.get('/listTreatment', isLoginUser, getTreatment)
router.get('/detail/:id', isLoginUser, getDetailTreatment)
router.post('', isLoginUser, createTreatment)
router.put('/:id', isLoginUser, updateTreatment)
router.delete('/:id', isLoginUser, deleteTreatment)

module.exports = router
