'use strict'

const controller = require('../controller')
const middleware = require('../middleware')
const Router = require('express').Router()

Router.post('/dealer', middleware.dealerCreate, controller.dealerCreate)
Router.post('/dealer/login', middleware.dealerLogin, controller.dealerLogin)
Router.post('/sale', middleware.saleCreate, controller.saleCreate)
Router.get('/sale', middleware.saleGet, controller.saleGet)
Router.get('/cashback/:tax_id', controller.cashGet)
module.exports = Router
