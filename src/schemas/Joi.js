'use strict'

const Joi = require('joi')

const DealerCreateRequest = Joi.object({
    name: Joi.string().required(),
    tax_id: Joi.string().min(11).max(11).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gov', 'br'] }}).required(),
    password: Joi.string().min(8).required()
})

const SaleCreateRequest = Joi.object({
    cod: Joi.string().required(),
    value: Joi.string().required(),
    date: Joi.date().required(),
    tax_id: Joi.string().min(11).max(11).required(),
})

const DealerLoginRequest = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gov', 'br'] }}).required(),
    password: Joi.string().min(8).required()
})

module.exports = { DealerCreateRequest, SaleCreateRequest, DealerLoginRequest }