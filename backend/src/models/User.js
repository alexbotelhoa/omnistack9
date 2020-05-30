const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true
    },
}, {
    timestamps: true,
})

module.exports = model('User', UserSchema)