const csv = require('csvtojson');
const _ = require('lodash');

function csvToJson(csvString){
    return csv().fromString(csvString);
}

function sortByDateAsc(collection, path='Date') {
    return _.sortBy(collection, (data) => stringToDate(data[path]));
}

function stringToDate(dateString) {
    return new Date(dateString);
}

module.exports = {
    csvToJson,
    sortByDateAsc,
    stringToDate,
}
