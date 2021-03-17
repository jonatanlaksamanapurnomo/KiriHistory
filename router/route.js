const express = require('express')
const cors = require('cors')
const app = express()
const Kiri = require("../model/Kirihistory");
const path = require('path');
const bodyParser = require('body-parser')
const viewPath = "C:/KiriHistory/views"
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
let modelKiri = new Kiri();
app.get("/", (req, res) => {
    res.sendFile(path.join(`${viewPath}/index.html`));
})


app.post('/searchRoute', (req, res) => {
    modelKiri.getData().then(data => {
        res.status(200).json({
            'status': 'OK',
            'messages': 'Data',
            'data': data,
        })
    })
})

// app.post('/searchRoute', (req, res) => {
//     let filteredData = kiriObj.getFilteredData(req.body)
//     res.status(200).json({
//         'status': 'OK',
//         'messages': 'Data',
//         'data': filteredData,
//     })
// })

module.exports = {app , express};