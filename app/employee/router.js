const express = require('express')
const { listEmployee, getDetailEmployee, createEmployee, updateEmployee, deleteEmployee } = require('./controller')
const router = express.Router()

router.post('', (req, res) => {
  const type = req.body.type
  if (type === 'list') {
    listEmployee(req, res)
  } else if (type === 'detail') {
    getDetailEmployee(req, res)
  } else if (type === 'create') {
    createEmployee(req, res)
  } else if (type === 'update') {
    updateEmployee(req, res)
  } else if (type === 'delete') {
    deleteEmployee(req, res)
  }
})
// router.get('/listEmployee', listEmployee)
// router.get('/detail/:id', getDetailEmployee)
// router.post('', createEmployee)
// router.put('/:id', updateEmployee)
// router.delete('/:id', deleteEmployee)

module.exports = router
