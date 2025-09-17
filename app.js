const express = require('express')
const postRouter = require('./routers/postRouter.js')

const app = express()

const port = 3000

app.use(express.json())

app.use(express.static('public'))

app.use('/', postRouter ) 

const errorsHandler = require('./middlewares/errorsHandlers.js')
const notFound = require('./middlewares/notFound.js')



app.use(errorsHandler)

app.use(notFound)

app.listen(port, ()=>{
    console.log('server della mia pasticceria')
})

