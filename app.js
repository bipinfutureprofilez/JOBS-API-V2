require('dotenv').config()
require('express-async-error')

const express = require('express')
const app = express()

const connectDB = require('./db/connection')
const port = process.env.PORT || 3000

const authRouter = require('./router/auth')
const errorHandler = require('./middleware/errorHandler')
const notFoundMiddleware = require('./middleware/not-Found-Middleware')


app.use(express.json())
app.use('/auth', authRouter)
app.use(errorHandler)
app.use(notFoundMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running at ${port}`));
    } catch (error) {
        console.log(error);        
    }
}

start();