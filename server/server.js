const cookieParser = require('cookie-parser')
const express = require('express')
const index = require('./routes/index')  
const mailRoutes = require('./routes/mail')  
const app = express()
const cors = require('cors')
const port = process.env.PORT||8000
const fURL = process.env.fURL||'http://localhost:3000/'
const mongoose = require('mongoose')
// const MONGODB_URL = process.env.MONGODB_URL||'mongodb://localhost:27017/login_portal'

mongoose.connect('mongodb+srv://newuser:mnitjaipur2019@cluster0.ztedf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({credentials: true, origin: fURL}))
app.use(index)
app.use(mailRoutes)

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
