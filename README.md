# nasdaq-stock-data-analysis-app
This application analyze the Nasdaq historical stock market data to ease the decision making process for stock investment.

## Available Scripts

In the project directory, please run:

### `npm start`

This will start start the server at localhost, port 3000.

## API endpoints

### `http://localhost:3000/api/v1/stocks?startDate=<yyyy-mm-dd>&endDate=<yyyy-dd-mm>` 
### `http://localhost:3000/api/v1/stocks/highestStreakByDays?startDate=<yyyy-mm-dd>&endDate=<yyyy-dd-mm>` 
### `http://localhost:3000/api/v1/stocks/highestVolumeAndPriceByDays?startDate=<yyyy-mm-dd>&endDate=<yyyy-dd-mm>`
### `http://localhost:3000/api/v1/stocks/bestOpeningPrice?startDate=<yyyy-mm-dd>&endDate=<yyyy-dd-mm>&smaLength=5`

The start date should be the historical date from when the user want to start analying the data upto the end date. The start date must be older than end date.
