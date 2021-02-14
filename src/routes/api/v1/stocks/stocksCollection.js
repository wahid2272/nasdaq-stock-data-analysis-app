const {
    getStocks,
    getHighestStreakByDays,
    getHighestVolumeAndPriceByDays,
    calculateSmaPercentage,
} = require('../../../../controllers/stocksController');

const express = require('express');
const router = express.Router();

router.get('/', getStocks);
router.get('/highestStreakByDays', getHighestStreakByDays);
router.get('/highestVolumeAndPriceByDays', getHighestVolumeAndPriceByDays);
router.get('/bestOpeningPrices', calculateSmaPercentage);


module.exports = router;
