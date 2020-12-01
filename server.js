const app = require("./router/route");
const port = 3000;
app.listen(port, () => {
    console.log(`Server run  at http://localhost:${port}`)
})