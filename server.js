const {app, express} = require("./router/route");
const PORT = process.env.PORT || 3000
app.use(express.static('views'))
app.use('/js', express.static(__dirname + 'views/js'))
app.use('/css', express.static(__dirname + 'views/css'))
app.set('views', './views')
app.listen(PORT, () => {
    console.log(`Server run  at http://localhost:${PORT}`)
})