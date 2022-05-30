const { describe, test, expect, jest: _jest } = require('@jest/globals')
const cashbackService = require('../../../src/infra/service/cashbackService')
describe('#CashbackService', () => {

    test('should return cashback value and porcentage the 10%', () => {
        const value = 90
        const result = cashbackService(value)
        const expected = { percentage: 10, valueCashback: '9.00' }
        expect(result).toEqual(expected)
    })

    test('should return cashback value and porcentage the 15%', () => {
        const value = 1200
        const result = cashbackService(value)
        const expected = { percentage: 15, valueCashback: '180.00' }
        expect(result).toEqual(expected)
    })

    test('should return cashback value and porcentage the 20%', () => {
        const value = 2000
        const result = cashbackService(value)
        const expected = { percentage: 20, valueCashback: '400.00' }
        expect(result).toEqual(expected)
    })
})