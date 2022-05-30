module.exports = (credit) => {
    if(credit < 1000) {
        return { percentage: 10, valueCashback: (credit * 0.1).toFixed(2) }
    } else if(credit >= 1000 && credit <= 1500) {
        return { percentage: 15, valueCashback: (credit *  0.15).toFixed(2) }
    } else {
        return { percentage: 20, valueCashback: (credit * 0.2).toFixed(2) }
    }   
}
