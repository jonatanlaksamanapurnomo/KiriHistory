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
    let date = moment(`${timestamps[0]} ${timestamps[2]} `, "YYYY-DD-MM hh")
    return (
        {
            // timestamp: timestamps[0],
            timestamp: date,
            day: date.day() + "",
            hour: date.hour() + "",
            start: {
                lat: parseFloat(kiri.start.split(",")[0]),
                lng: parseFloat(kiri.start.split(",")[1])
            },
            end: {
                lat: parseFloat(kiri.finish.split(",")[0]),
                lng: parseFloat(kiri.finish.split(",")[1])
            }
        }
    )
};

module.exports = {kiriSchema, fieldNameMapper, moment};