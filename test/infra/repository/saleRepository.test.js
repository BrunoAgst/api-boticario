const { describe, test, jest: _jest, beforeEach, beforeAll, expect } = require('@jest/globals')
const SaleRepository = require('../../../src/infra/repository/saleRepository')
const SaleSchema = require('../../../src/schemas/Sale')

describe('SaleRepository', () => {
    describe('saleGet', () => {

        beforeEach(() => {
            _jest.clearAllMocks()
            _jest.spyOn(
                SaleSchema,
                'find'
            ).mockResolvedValue([
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
            ])
        })

        test('should saleCreate return succes sales', async () => {
       
            const userId = "3213dfsfds"

            const saleRepository = new SaleRepository()
            const result = await saleRepository.saleGet(userId)
            
            const expected = {"sales": [
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
            ]}

            expect(result).toEqual(expected)
        })

        test('should saleCreate return sales not found', async () => {
            
            _jest.spyOn(
                SaleSchema,
                'find'
            ).mockResolvedValue()
                
            const userId = "3213dfsfds"

            const saleRepository = new SaleRepository()
            const result = await saleRepository.saleGet(userId)
            
            const expected = { status: 404, error: 'Sales not found' }

            expect(result).toEqual(expected)
        })

        test('should saleCreate return error', async () => {
            
            _jest.spyOn(
                SaleSchema,
                'find'
            ).mockRejectedValue()
                
            const userId = "3213dfsfds"

            const saleRepository = new SaleRepository()
            const result = await saleRepository.saleGet(userId)
            
            expect(result).toBeTruthy()
        })
    })

    describe('saleCreate', () => {

        beforeEach(() => {
            _jest.clearAllMocks()
            _jest.spyOn(
                SaleSchema,
                'findOne'
            ).mockResolvedValue()

            _jest.spyOn(
                SaleSchema,
                'create'
            ).mockResolvedValue('ok')
        })

        test('should saleCreate return success with any CPF', async () => {
            const payload = {
                "cod": "8",
                "value": "100.90",
                "tax_id": "15350946066",
                "date": "11/11/2022"
            }

            const userId = "3213dfsfds"

            const saleRepository = new SaleRepository()
            const result = await saleRepository.saleCreate(payload, userId)
            expect(result).toEqual('ok')
        })

        test('should saleCreate return sale exists', async () => {

            _jest.spyOn(
                SaleSchema,
                'findOne'
            ).mockResolvedValue({})

            const payload = {
                "cod": "8",
                "value": "100.90",
                "tax_id": "15350946066",
                "date": "11/11/2022"
            }

            const userId = "3213dfsfds"

            const saleRepository = new SaleRepository()
            const result = await saleRepository.saleCreate(payload, userId)
            expect(result).toEqual({ status: 401, error: 'Sale exists' })
        })

        test('should saleCreate return success with CPF 15350946056', async () => {
            const payload = {
                "cod": "8",
                "value": "100.90",
                "tax_id": "15350946056",
                "date": "11/11/2022"
            }

            const userId = "3213dfsfds"

            const saleRepository = new SaleRepository()
            const result = await saleRepository.saleCreate(payload, userId)
            expect(result).toEqual('ok')
        })

        test('should saleCreate return error', async () => {

            _jest.spyOn(
                SaleSchema,
                'findOne'
            ).mockRejectedValue()

            const payload = {
                "cod": "8",
                "value": "100.90",
                "tax_id": "15350946056",
                "date": "11/11/2022"
            }

            const userId = "3213dfsfds"

            const saleRepository = new SaleRepository()
            const result = await saleRepository.saleCreate(payload, userId)
            expect(result).toBeTruthy()
        })

    })
})