const express = require('express')
const cors = require('cors')
const app = express()
const data = require("../data/data.json");
const kiri = require("../model/Kirihistory");
const path = require('path');
const bodyParser = require('body-parser')
let kiriObj = new kiri(data);
const viewPath = "C:/KIRI/views"
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(path.join(`${viewPath}/index.html`));
})

app.post('/searchRoute', (req, res) => {
    let filteredData = kiriObj.getFilteredData(req.body)
    res.status(200).json({
        'status': 'OK',
        'messages': 'Data',
        'data': filteredData,
    })
})

module.exports = app;