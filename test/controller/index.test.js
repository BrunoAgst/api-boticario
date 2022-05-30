const { describe, test, jest: _jest, beforeEach, beforeAll, expect } = require('@jest/globals')
const Controller = require('../../src/controller/index')
const DealerRepository = require('../../src/infra/repository/dealerRepository')
const SaleRepository = require('../../src/infra/repository/saleRepository')
const ExternalService = require('../../src/infra/service/cashbackService')

describe('Controller', () => {
    describe('dealerCreate', () => {

        beforeEach(() => {
            _jest.clearAllMocks()
        })

        test('should dealer return create', async () => {
            
            const request = {
                "body": {
                    "name": "Ana Melissa",
                    "tax_id": "12343567844",
                    "email": "ana@teste.com",
                    "password": "123123123123"
                }
            }

            const response = {
                status: _jest.fn(),
                json: _jest.fn()
            }

            _jest.spyOn(
                DealerRepository.prototype,
                'createDealer'
            ).mockResolvedValue()
            
            const result = await Controller.dealerCreate(request, response)
            expect(response.json).toHaveBeenCalled()
            expect(result).toBeUndefined()

        })
    })

    describe('dealerLogin', () => {

        beforeEach(() => {
            _jest.clearAllMocks()
        })

        test('should dealer login success', async () => {
            
            const request = {
                "body": {
                    "email": "ana@teste.com",
                    "password": "123123123123"
                }
            }

            const response = {
                status: _jest.fn(),
                json: _jest.fn()
            }

            _jest.spyOn(
                DealerRepository.prototype,
                'loginDealer'
            ).mockResolvedValue()
            
            const result = await Controller.dealerLogin(request, response)
            expect(response.json).toHaveBeenCalled()
            expect(result).toBeUndefined()

        })
    })

    describe('saleCreate', () => {

        beforeEach(() => {
            _jest.clearAllMocks()
        })

        test('should sale create success', async () => {
            
            const request = {
                "body": {
                    "cod": "8",
                    "value": "100.90",
                    "tax_id": "15350946056",
                    "date": "11/11/2022"
                }
            }

            const response = {
                status: _jest.fn(),
                json: _jest.fn()
            }

            _jest.spyOn(
                SaleRepository.prototype,
                'saleCreate'
            ).mockResolvedValue()
            
            const result = await Controller.saleCreate(request, response)
            expect(response.json).toHaveBeenCalled()
            expect(result).toBeUndefined()

        })
    })

    describe('saleGet', () => {

        beforeEach(() => {
            _jest.clearAllMocks()
        })

        test('should return sale', async () => {
            
            const request = {
                "headers": {
                    "authorization": "123123123123jkl12h3jk123",
                }
            }

            const response = {
                status: _jest.fn(),
                json: _jest.fn()
            }

            _jest.spyOn(
                SaleRepository.prototype,
                'saleGet'
            ).mockResolvedValue()
            
            const result = await Controller.saleGet(request, response)
            expect(response.json).toHaveBeenCalled()
            expect(result).toBeUndefined()

        })
    })

    describe('cashGet', () => {

        beforeEach(() => {
            _jest.clearAllMocks()
        })

        test('should return cashback dealer', async () => {
            
            const request = {
                "params": {
                    "tax_id": "12312312312",
                }
            }

            const response = {
                status: _jest.fn(),
                json: _jest.fn()
            }
            
            const result = await Controller.cashGet(request, response)
            expect(response.json).toHaveBeenCalled()
            expect(result).toBeUndefined()

        })
    })
})