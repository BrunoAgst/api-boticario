'use strict'

const saleSchema = require('../../schemas/Sale')

class SaleRepository {
    async saleCreate(payload, userId) {
        try {
            const { cod, value, tax_id, date } = payload

            const searchSale = await saleSchema.findOne({ cod })

            if(searchSale) return { status: 401, error: 'Sale exists' }

            if(tax_id === '15350946056') {
                return await saleSchema.create({ cod, value, tax_id, dealer_id: userId, date, status: 'Aprovado'})
            }

            return await saleSchema.create({ cod, value, tax_id, dealer_id: userId, date, status: 'Em validação'})

        } catch (error) {
            return new Error(error)
        }
    }

    async saleGet(userId) {
        try {

            const sales = await saleSchema.find({ dealer_id: userId })

            if(!sales) return { status: 404, error: 'Sales not found' }

            return { sales }

        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = SaleRepository