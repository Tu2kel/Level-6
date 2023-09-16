const express =  require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

//Middleware

app.use(express.json()) //parses data
app.use(morgan('dev')) //logs to console

mongoose.set('strictQuery', true)

//connect to DB
mongoose.connect(
    "mongodb+srv://kelleyanthonyk:YZEJ5lvMl0gPfMIe@cluster0.tnwv1cv.mongodb.net/Vote",
  (err) => {
    console.log("connected to DB", err);
  }
);

//Routes
app.use('/user',require('./routes/userRouter'))

//Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({
        errMsg: err.message //from loginRouter
    })
})


//Server Listen
app.listen(7272, () => {
    console.log(`Listening on port 7272`)
})