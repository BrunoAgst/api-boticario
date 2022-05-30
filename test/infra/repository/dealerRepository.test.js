const { describe, test, jest: _jest, beforeEach, beforeAll, expect } = require('@jest/globals')
const DealerSchema = require('../../../src/schemas/Dealer')
const DealerRepository = require('../../../src/infra/repository/dealerRepository')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('DealerRepository', () => {
    describe('createDealer', () => {

        beforeEach(() => {
    
            _jest.clearAllMocks()
            _jest.spyOn(
                DealerSchema,
                'findOne'
            ).mockResolvedValue()

            _jest.spyOn(
                DealerSchema,
                'create'
            ).mockResolvedValue({})
    
        })
    
        beforeAll(() => _jest.clearAllMocks())

        test('should create dealer return success', async() => {
            const payload = {
                "name": "bruno augusto",
                "tax_id": "12312312312",
                "email": "bruno@teste.com",
                "password": "12312312312233"
            }
    
            const dealerRepository = new DealerRepository()
            const result = await dealerRepository.createDealer(payload)
            expect(result).toEqual('ok')
        })

        test('should create dealer return dealer exists', async() => {
            _jest.spyOn(
                DealerSchema,
                'findOne'
            ).mockResolvedValue({})
            
            const payload = {
                "name": "bruno augusto",
                "tax_id": "12312312312",
                "email": "bruno@teste.com",
                "password": "12312312312233"
            }
    
            const dealerRepository = new DealerRepository()
            const result = await dealerRepository.createDealer(payload)
            expect(result).toEqual({ status: 401, error: 'Dealer exists' })
        })

        test('should create dealer return error', async() => {
            _jest.spyOn(
                DealerSchema,
                'findOne'
            ).mockRejectedValue()
            
            const payload = {
                "name": "bruno augusto",
                "tax_id": "12312312312",
                "email": "bruno@teste.com",
                "password": "12312312312233"
            }
    
            const dealerRepository = new DealerRepository()
            const result = await dealerRepository.createDealer(payload)
            expect(result).toBeTruthy()
        })
    })

    describe("loginDealer", () => {

        test('should login dealer return success', async() => {

            _jest.spyOn(
                DealerSchema,
                'findOne'
            ).mockResolvedValue({ email: 'bruno@teste.com'})


            _jest.spyOn(
                bcrypt,
                'compareSync'
            ).mockResolvedValue()
            
            _jest.spyOn(
                jwt,
                'sign'
            ).mockResolvedValue('123rdfgdf')

            const payload = {
                "email": "bruno@teste.com",
                "password": "12312312312233"
            }
    
            const dealerRepository = new DealerRepository()
            const result = await dealerRepository.loginDealer(payload)
            expect(result).toEqual({ token: '123rdfgdf' })
        })

        test('should login return dealer exists', async() => {
            
            _jest.clearAllMocks()

            _jest.spyOn(
                DealerSchema,
                'findOne'
            ).mockResolvedValue()

            const payload = {
                "email": "bruno@teste.com",
                "password": "12312312312233"
            }
    
            const dealerRepository = new DealerRepository()
            const result = await dealerRepository.loginDealer(payload)
            expect(result).toEqual({ status: 404, error: 'Dealer not found, please verify your email address' })
        })

        test('should login return error', async() => {
            
            _jest.clearAllMocks()

            _jest.spyOn(
                DealerSchema,
                'findOne'
            ).mockRejectedValue({})

            const payload = {
                "email": "bruno@teste.com",
                "password": "12312312312233"
            }
    
            const dealerRepository = new DealerRepository()
            const result = await dealerRepository.loginDealer(payload)
            expect(result).toBeTruthy()
        })

    })
})