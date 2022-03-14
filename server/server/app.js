const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('../schema/schema')
const mongoose = require('mongoose')
require('dotenv/config')
const cors = require('cors')

const app = express()
const PORT = 4000

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(`Connection failed, error: ${err}`)
})

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true}))

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server has started')
})