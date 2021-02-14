const express = require('express');
const stocks = require('./stocks');
const {stocksApiParamValidator} = require('../../../Middlewares/apiParamValidator')

const router = express.Router();

router.use('/stocks', stocksApiParamValidator, stocks);

module.exports = router;
