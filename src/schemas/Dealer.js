'use strict'

const { Schema, model } = require('mongoose')

const dealerSchema = new Schema({
    name: String,
    tax_id: String,
    email: String,
    password: String
},
{
    timestamps: true
})

module.exports = model('Dealer', dealerSchema)