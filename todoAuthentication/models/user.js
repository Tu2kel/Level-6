const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
    type: String,
    required: true,
    lowercase: true, //forces username to be lowercased ... username is not case sensitive
    unique: true // Mongoose installed ...throws error if similar username exists
    },
    password:{
        type:String,
        required: true
    }, 
    memberSince: {
        type: Date, 
        default:Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

})



module.exports = mongoose.model('User', userSchema)