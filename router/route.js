const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const data = require("../data/data.json");
const kiri = require("../model/Kirihistory");

let kiriObj = new kiri(data);
app.get('/', (req, res) => {
    console.log(kiriObj.getDataByDate("2014-27-2", "2015-28-2"));
    res.send('Hello World!')
})

module.exports = app;