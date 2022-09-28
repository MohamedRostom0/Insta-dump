const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./db')
require('dotenv').config()

connectDB()

const app = express()

app.use(express.json())

// Add middlewares
app.use(cors());

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

// Import Routers
const postsRouter = require('./routes/posts')

// Mount Routers to Server
app.use('/api/posts', postsRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT} `)
})