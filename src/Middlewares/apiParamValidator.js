function stocksApiParamValidator (req, res, next) {
    if(!req.query.startDate || !req.query.endDate) {
        console.log('start date or end date is missing')

        return res.status(400).send({
            error: true,
            error_message: 'Start date or end date is missing',
        })
    }
    
    next();
}

module.exports = {
    stocksApiParamValidator,
}

