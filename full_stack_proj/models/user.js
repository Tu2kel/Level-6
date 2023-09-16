const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true, //forces username to register in lowercase
        unique: true // Mongoose installed throws err if similar username exists
    },
    password:{
        type :String ,
        required: true
    }
})


module.exports = mongoose.model('User', userSchema)