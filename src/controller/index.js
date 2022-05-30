'use strict'

const DealerRepository = require('../infra/repository/dealerRepository')
const SaleRepository = require('../infra/repository/saleRepository')
const externalService = require('../infra/service/externalService')
const cleanDataSalesService = require('../infra/service/cleanDataSalesService')


module.exports = {
    dealerCreate: async (request, response) => {
        try {
            const payload = request.body
            
            const dealerRepository = new DealerRepository()

            const { status, error } = await dealerRepository.createDealer(payload)
            if(error) {
                response.status(status)
                response.json({ error })
                return
            }

            response.json({ message: 'dealer created successfully' })

        } catch (error) {
            console.log(error)
            response.status(500)
            response.json({ error: "Internal Server Error" })
        }
    },

    dealerLogin: async (request, response) => {
        try {
            const payload = request.body

            const dealerRepository = new DealerRepository()

            const { token, status, error } = await dealerRepository.loginDealer(payload)

            if(error) {
                response.status(status)
                response.json({ error })
                return
            }

            response.json({ token })

        } catch (error) {
            console.log(error)
            response.status(500)
            response.json({ error: "Internal Server Error" })
        }
    },

    saleCreate: async (request, response) => {
        try {
            const payload = request.body
            const userId = request.userId

            const saleRepository = new SaleRepository()

            const { status, error } = await saleRepository.saleCreate(payload, userId)

            if(error) {
                response.status(status)
                response.json({ error })
                return            
            } 
                
            response.json({ message: "sale created successfully" })

        } catch (error) {
            console.log(error)
            response.status(500)
            response.json({ error: "Internal Server Error" })
        }
    },

    saleGet: async (request, response) => {
        try {
            const userId = request.userId

            const saleRepository = new SaleRepository()

            const { sales, status, error } = await saleRepository.saleGet(userId)

            if(error) {
                response.status(status)
                response.json(error)
                return
            }

            const salesCleanData = cleanDataSalesService(sales)

            response.json(salesCleanData)

        } catch (error) {
            console.log(error)
            response.status(500)
            response.json({error: 'Internal Server Error'})
        }   
    },

    cashGet: async (request, response) => {
        try {
            const tax_id = request.params.tax_id

            const { body } = await externalService(tax_id)

            response.json({ value: `R$${body.credit}` })

        } catch (error) {
            console.log(error)
            response.status(500)
            response.json({error: 'Internal Server Error'})
        }
    }
}