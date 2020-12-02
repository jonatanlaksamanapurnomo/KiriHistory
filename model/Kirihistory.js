const {fieldNameMapper, moment} = require("./schemas/KiriSchema");

class KiriHistory {
    constructor(inputData) {
        this.data = this.sanitize(inputData);
    }

    sanitize(inputData) {
        return inputData.map(fieldNameMapper);

    }

    buildFilter = (filter) => {
        let query = {};
        for (let keys in filter) {
            if ((filter[keys].constructor === Object) || (filter[keys].constructor === Array && filter[keys].length > 0)) {
                query[keys] = filter[keys];
            }
        }
        return query;
    }
    filterData = (query) => {
        let data = this.getDatas();

        // console.log(query)
        const filteredData = data.filter((item) => {
            for (let key in query) {
                if (item[key] === undefined) {
                    return false;
                } else if (key === "timestamp") {
                    query[key][0] = this.stringToDate(query[key][0])
                    query[key][1] = this.stringToDate(query[key][1])
                    let status = item[key].isBetween(query[key][0], query[key][1])
                    if (!status) {
                        return false;
                    }
                } else if (!query[key].includes(item[key])) {
                    return false;
                }
            }
            return true;
        });
        return filteredData;
    };

    stringToDate(stringDate) {
        return moment(stringDate, "YYYY-DD-MM hh")
    }

// {
//     "timestamp":["2014-1-2 04" , "2014-2-2 22"]
//
// }
    // return this.data.filter(item => item.timestamp.isBetween(startDate, endDate))
    getFilteredData(filterInput) {
        let query = this.buildFilter(filterInput)
        return this.filterData(query);
    }

    getDatas() {
        return this.data;
    }
}

module.exports = KiriHistory;
