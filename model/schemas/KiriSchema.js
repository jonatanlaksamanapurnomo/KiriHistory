const moment = require("moment");
moment().format();
let kiriSchema = {
    Kiri: {
        timestamp: null,
        start: {
            lat: '',
            long: ''
        },
        end: {
            lat: '',
            long: ''
        },
    }
}

const fieldNameMapper = kiri => {
    let timestamps = kiri.timestamp.split(":")
    return (
        {
            timestamp: moment(`${timestamps[0]} ${timestamps[2]} `, "YYYY-DD-MM hh"),
            start: {
                lat: kiri.start.split(",")[0],
                long: kiri.start.split(",")[1]
            },
            end: {
                lat: kiri.finish.split(",")[0],
                long: kiri.finish.split(",")[1]
            }
        }
    )
};

module.exports = {kiriSchema, fieldNameMapper, moment};