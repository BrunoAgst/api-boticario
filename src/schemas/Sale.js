'use strict'

const { Schema, model } = require('mongoose')

const saleSchema = new Schema({
    cod: String,
    value: String,
    tax_id: String,
    status: String,
    date: Date,
    dealer_id : {type: Schema.Types.ObjectId, ref: 'Dealer'},
},
{
    timestamps: true
})

module.exports = model('Sale', saleSchema)