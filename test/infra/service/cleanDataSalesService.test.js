const { describe, test, expect, jest: _jest } = require('@jest/globals')
const cleanDataSalesService = require('../../../src/infra/service/cleanDataSalesService')
describe('#CashbackService', () => {

    test('should return cashback value and porcentage the 10%', () => {
        const sales = [
            {
                _id: "6292de2fc04fff21a0601a3c",
                cod: '7',
                value: '100.90',
                tax_id: '15350946056',
                status: 'Aprovado',
                date: '2022-11-11T03:00:00.000Z',
                dealer_id: "6292de12c04fff21a0601a38",
                createdAt: '2022-05-29T02:45:03.432Z',
                updatedAt: '2022-05-29T02:45:03.432Z',
            },
            {
                _id: "6292de39c04fff21a0601a3f",
                cod: '8',
                value: '100.90',
                tax_id: '15350946056',
                status: 'Aprovado',
                date: '2022-11-11T03:00:00.000Z',
                dealer_id: "6292de12c04fff21a0601a38",
                createdAt: '2022-05-29T02:45:13.067Z',
                updatedAt: '2022-05-29T02:45:13.067Z',
            }
        ]
        const result = cleanDataSalesService(sales)
        const expected = [
            {
                "cod": "7",
                "value": "100.90",
                "date": "2022-11-11T03:00:00.000Z",
                "status": "Aprovado",
                "percentageCashback": 10,
                "valueCashback": "10.09"
            },
            {
                "cod": "8",
                "value": "100.90",
                "date": "2022-11-11T03:00:00.000Z",
                "status": "Aprovado",
                "percentageCashback": 10,
                "valueCashback": "10.09"
            }
        ]
        expect(result).toEqual(expected)
    })
})