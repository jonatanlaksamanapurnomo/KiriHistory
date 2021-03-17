const {app,express} = require("./router/route");
const port = 3000;
app.use(express.static('views'))
app.use('/js', express.static(__dirname + 'views/js'))
app.use('/css', express.static(__dirname + 'views/css'))
app.set('views', './views')
app.listen(port, () => {
    console.log(`Server run  at http://localhost:${port}`)
})