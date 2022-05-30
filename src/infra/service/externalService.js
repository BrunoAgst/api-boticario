'use strict'

const axios = require('axios')

module.exports = async (tax_id) => {
    try {
        const config = {
            headers: {
                token: process.env.EXTERNAL_SERVICE_TOKEN
            }
        }
        
        const url = process.env.EXTERNAL_SERVICE_URL + tax_id
        
        const { data } = await axios.get(url, config)

        return data

    } catch (error) {
        return { error }   
    }
}