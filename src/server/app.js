const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(router)

app.listen(3307, () => {
    console.log('server is started')
})
