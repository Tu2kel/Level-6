const mongoose = require('mongoose') // Importing mongoose
const Schema = mongoose.Schema // Destructuring Schema from mongoose

// Defining a new Schema
const userSchema = new Schema({
    username: {
        type: String, // Data type is String
        required: true, // This field is required
        lowercase: true, // This will convert the username to lowercase before saving
        unique: true // This ensures the username is unique in the database
    },
    password:{
        type :String , // Data type is String
        required: true // This field is required
    }
})

// Exporting the User model
module.exports = mongoose.model('User', userSchema)