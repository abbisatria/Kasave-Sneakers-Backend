const express = require('express')
const router = express.Router()
const { createTreatment, getTreatment, updateTreatment, deleteTreatment } = require('./controller')

router.get('/detail/:id', getTreatment)
router.post('', createTreatment)
router.put('/:id', updateTreatment)
router.delete('/:id', deleteTreatment)

module.exports = router
