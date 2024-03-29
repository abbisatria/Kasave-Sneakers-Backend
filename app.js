const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./app/auth/router')
const userRouter = require('./app/users/router')
const categoryRouter = require('./app/category/router')
const treatmentRouter = require('./app/treatment/router')
const transactionRouter = require('./app/transaction/router')
const expenseRouter = require('./app/expense/router')
const employeeRouter = require('./app/employee/router')

const app = express()
const URL = '/api/v1'
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(`${URL}/user`, userRouter)
app.use(`${URL}/auth`, authRouter)
app.use(`${URL}/category`, categoryRouter)
app.use(`${URL}/treatment`, treatmentRouter)
app.use(`${URL}/transaction`, transactionRouter)
app.use(`${URL}/expense`, expenseRouter)
app.use(`${URL}/employee`, employeeRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
