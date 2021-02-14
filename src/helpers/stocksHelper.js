const axios = require('axios');
const {baseUrl, version, stocksEndpoint} = require('../config/apiConfig/stocks');
const {csvToJson} = require('../helpers/utils');


function getStocksFromApi(startDate, endDate) {
    return axios.get(`${baseUrl}${version}${stocksEndpoint}/${startDate}/${endDate}`)
                .then(stocks => {
                    return csvToJson(stocks.data.toString());
                })
                .catch(err => res.status(400).send(err.stack));
};


function getSmaValue(data, valueKey='Close/Last') {    
    return data.reduce((result, item, index) => {
        result = result + parseFloat(item[valueKey].slice(1));
        
        if(index == data.length-1) {
            result /= data.length;
        }

        return result;
    }, 0);
};


function getDiffOfPriceAgainstSmaInPerc(price, smaValue) {
    return ((price - smaValue) / smaValue) * 100;
}


module.exports = {
    getStocksFromApi,
    getSmaValue,
    getDiffOfPriceAgainstSmaInPerc,
};
