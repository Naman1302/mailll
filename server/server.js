require('dotenv').config();
const cookieParser = require('cookie-parser')
const express = require('express')
const index = require('./routes/index')  
const mailRoutes = require('./routes/mail')  
const app = express()
const cors = require('cors')
const port = process.env.PORT||8000
const fURL = process.env.fURL||'http://localhost:3000/'
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{useUnifiedTopology:true, useNewUrlParser: true})
.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({credentials: true, origin: fURL}))
app.use(index)
app.use(mailRoutes)

// app.listen(port, ()=>{
//     console.log(`listening on port ${port}`)
// })
