const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect(
  'mongodb+srv://graph:FINvExwRoLj9NYUG@cluster0.undni.mongodb.net/graphdb',
  {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
)

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to DB!'))

module.exports = app
