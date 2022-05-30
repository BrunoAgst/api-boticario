const SaleFactory = require('../../factory/saleFactory')

module.exports = (sales) => {

    let salesFinal = []
    
    sales.forEach(sale => {
        salesFinal.push(new SaleFactory(sale).factory())
    })

    return salesFinal
}