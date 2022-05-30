'use strict'

const { DealerCreateRequest, SaleCreateRequest, DealerLoginRequest } = require('../schemas/Joi')
const jwt = require('jsonwebtoken')
const { response } = require('express')

module.exports = {
    
    dealerCreate: (request, response, next) => {
        const { error } = DealerCreateRequest.validate(request.body)

        if(error) {
            response.status(422)
            response.json({ error: error.details[0].message })
            return
        }

        next()
    },

    saleCreate: (request, response, next) => {
        const token = request.headers.authorization

        if (!token) {
            response.status(401) 
            response.json({ error: 'No token provided.' })
            return
        }
        
        const { error } = SaleCreateRequest.validate(request.body)
        
        if(error) {
            response.status(422)
            response.json({ error: error.details[0].message })
            return
        }
        
        const { auth, errorJWT, id } = verifyJWTAndReturnID(token)

        if(!auth) {
            response.status(500)
            response.send(errorJWT.name)
            return
        }

        request.userId = id

        next()
    },

    dealerLogin: (request, response, next) => {
        const { error } = DealerLoginRequest.validate(request.body)

        if(error) {
            response.status(422)
            response.json({ error: error.details[0].message })
            return
        }

        next()
    },

    saleGet: (request, response, next) => {
        const token = request.headers.authorization

        if (!token) {
            response.status(401) 
            response.json({ error: 'No token provided.' })
            return
        }

        const { auth, errorJWT, id } = verifyJWTAndReturnID(token)

        if(!auth) {
            response.status(500)
            response.send(errorJWT.name)
            return
        }

        request.userId = id

        next()
    }
}

function verifyJWTAndReturnID(token) {
    try {
        const token_cod = token.split(' ')[1]
        const { id } = jwt.verify(token_cod, process.env.JWT_SECRET)
        return { auth: true,  id }
    } catch (errorJWT) {
        return { auth: false , errorJWT } 
    }
}