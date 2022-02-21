const express = require('express')
const { listEmployee, getDetailEmployee, createEmployee, updateEmployee, deleteEmployee } = require('./controller')
const router = express.Router()

router.get('/listEmployee', listEmployee)
router.get('/detail/:id', getDetailEmployee)
router.post('', createEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

module.exports = router
