const {fieldNameMapper, moment} = require("./schemas/KiriSchema");

class KiriHistory {
    constructor(inputData) {
        this.data = this.sanitize(inputData);
    }

    sanitize(inputData) {
        return inputData.map(fieldNameMapper);

    }

    stringToDate(stringDate) {
        return moment(moment(stringDate, "YYYY-DD-MM hh"))
    }

    getDataByDate(startDate, endDate) {
        startDate = this.stringToDate(startDate);
        endDate = this.stringToDate(endDate);
        return this.data.filter(item => item.timestamp.isBetween(startDate, endDate))
    }

    getDatas() {
        return this.data;
    }
}

module.exports = KiriHistory;
