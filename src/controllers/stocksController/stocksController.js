const {sortByDateAsc} = require('../../helpers/utils');
const {getStocksFromApi, getSmaValue, getDiffOfPriceAgainstSmaInPerc} = require('../../helpers/stocksHelper');
const _ = require('lodash');

const getStocks = (req, res) => {
    console.log('Get Stocks');
    const {startDate, endDate} = req.query;
    console.log(startDate, endDate, req.query);

    getStocksFromApi(startDate, endDate).then(stocks => {
        res.status(200).send(sortByDateAsc(stocks, 'Date'))
    });
}

const getHighestStreakByDays = (req, res) => {
    console.log('Get Stocks');
    const {startDate, endDate} = req.query;
    console.log(startDate, endDate, req.query);

    getStocksFromApi(startDate, endDate).then(stocks => {
        let maxStreak = 0;
        let lastMaxPrice = 0;
        let currentStreak = 0;

        _.forEach(stocks, function (stocks) {
            const price = parseFloat(stocks['Close/Last'].substring(1, stocks['Close/Last'].length));
            
            if(price > lastMaxPrice){
                currentStreak = 0;
            }

            lastMaxPrice = price;
            currentStreak++;

            if(currentStreak > maxStreak) {
                maxStreak = currentStreak - 1;
            }
        })

        res.status(200).send({
            maximumStreak: maxStreak
        })
    });
}

const getHighestVolumeAndPriceByDays = (req, res) =>{
    const {startDate, endDate} = req.query;

    getStocksFromApi(startDate, endDate).then(stocks => {
       
    // Maximum Volume by Date
        const maxVolumeObject = _.maxBy(stocks, function(stock) {
            return parseInt(stock.Volume);
        })
       
        const maxDifferenceStock = stocks.map(stock => ({
            priceDifference: parseFloat(stock.High.slice(1)) - parseFloat(stock.Low.slice(1)),
            ...stock,
        })).reduce((result, stock) => {
            if(Object.keys(result).length == 0 || result.priceDifference < stock.priceDifference) {
                result = stock;
            }

            return result;
        }, {});

        /*_.forEach(stocks, function (stocks) {
            const date = stocks['Date'];
            const highPrice = parseFloat(stocks['High'].substring(1, stocks['High'].length));
            const lowPrice = parseFloat(stocks['Low'].substring(1, stocks['Low'].length));
            const priceChange = highPrice - lowPrice;

            if(maxValue < priceChange){
                maxValue = priceChange;
                maxChangeDate = date;
            }
        })*/

        res.status(200).send({
            maxVolumeByDate: maxVolumeObject.Date,
            maxChangePriceByDate: maxDifferenceStock.Date,
        })
    })    
}


const calculateSmaPercentage = (req, res) => {
    const {startDate, endDate} = req.query;
    const { smaLength } = req.query;

    getStocksFromApi(startDate, endDate).then(stocks => {
        let dataList = [];

        const stocksWithSma = sortByDateAsc(stocks).filter((stock, index, originalStocks) => {
            if((index+1) <= smaLength ) return false;
            
            //we are taking previous dates based on smaLength
            stock.smaValue = getSmaValue(
                originalStocks.slice(index-smaLength, index),
                'Close/Last' 
            )

            const diffInPerc = getDiffOfPriceAgainstSmaInPerc(stock.Open.slice(1), stock.smaValue);
            if(diffInPerc < 0) return false;

            stock.smaDiffWithOpeningPriceInPerc = diffInPerc;

            return true;
        });

        /*for(let i = 0; i< stocks.length; i++) {
            let date = stocks[i]['Date'];
            let claculteAmount = getSmaValue(stocks.slice(i+1, i+6));
            let openingData = parseFloat(stocks[i]['Open'].substring(1, stocks[i]['Open'].length));

            if(claculteAmount > 0) {
                let percentage = ((openingData - claculteAmount) / claculteAmount) * 100;
                if(percentage > 0) {
                    let data = {'date': date, 'value': percentage}
                    dataList.push(data);
                }
            }
        }
         const smaPercentage = _.sortBy(dataList, ['value']).reverse();*/

         res.status(200).send({
             smaPercentageList: _.orderBy(stocksWithSma, ['smaDiffWithOpeningPriceInPerc'], ['desc'])
         });
    })
}


module.exports = {
    getStocks,
    getHighestStreakByDays,
    getHighestVolumeAndPriceByDays,
    calculateSmaPercentage,
};
