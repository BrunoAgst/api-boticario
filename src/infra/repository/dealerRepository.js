'use strict'

const dealerSchema = require('../../schemas/Dealer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class DealerRepository {
    async createDealer(payload) {
        try {
            const { name, tax_id, email, password } = payload

            let searchDealer = await dealerSchema.findOne({ tax_id })

            if(searchDealer) return { status: 401, error: 'Dealer exists' }

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            await dealerSchema.create({ name, tax_id, email, password: hash })

            return 'ok'
        } catch (error) {
            console.log(error)
            return new Error({error: 'Internal error' })
        }
    }

    async loginDealer(payload) {
        try {
            const { email, password } = payload

            let dealer = await dealerSchema.findOne({ email })

            if(!dealer) return { status: 404, error: 'Dealer not found, please verify your email address' }

            const validPassword = bcrypt.compareSync(password, dealer.password)

            if(!validPassword) return { status: 401, error: 'Password is incorrect' }

            const id = dealer.id
            
            const token =  await jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: 600 })

            return { token }

        } catch (error) {
            return new Error(error)
        }
    }
}

module.exports = DealerRepository