const express = require('express')
const app = express()
const routerEmployee = require('./routes/employee')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.json())
app.use(routerEmployee)

app.listen(4000,'0.0.0.0', () => {
    console.log('server started at port 4000')
})