const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const env = require('./envVariables')

const register = require('./routes/registerRoute')
const login = require('./routes/loginRoute')

mongoose.connect(env.mongoDB)
    .then(() => {console.log('Connected to mongoDB')})
    .catch((err) => {console.log('Could not Connect to mongoDB', err)})


app.use(cors())
app.use(express.json());
app.use('/api/register', register)
app.use('/api/login', login)

app.listen(3003, () => {
    console.log('Server is Listening on port 3003')
})