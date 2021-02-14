const express = require('express');
const router = express.Router();


const {
    getStocks,
    getHighestStreakByDays,
    getHighestVolumeAndPriceByDays,
    calculateSmaPercentage,
} = require('../../../../controllers/stocksController');


router.get('/', getStocks);
router.get('/highestStreakByDays', getHighestStreakByDays);
router.get('/highestVolumeAndPriceByDays', getHighestVolumeAndPriceByDays);
router.get('/bestOpeningPrices', calculateSmaPercentage);


module.exports = router;
