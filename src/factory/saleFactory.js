'use strict'

const cashbackService = require('../infra/service/cashbackService')

class SaleFactory {
    constructor({ cod, value, date, status }) {
        this.cod = cod
        this.value = value
        this.date = date
        this.status = status
    }

    factory(){
        const { percentage, valueCashback } = cashbackService(this.value)
        return {
            cod: this.cod,
            value: this.value,
            date: this.date,
            status: this.status,
            percentageCashback: percentage,
            valueCashback: valueCashback
        }
    }
}

module.exports = SaleFactory