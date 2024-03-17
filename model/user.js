const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name!'],
        minLength: [3, 'Atleast 3 letters should be added.'],
        maxLength: 100,
    },
    email: {
        type: String,
        required: [true, 'Please provide the email!'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter valid email!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide the password!'],
        minLength: [8, 'Atleast 8 letters should be added.'],
    }
})

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, userName: this.name}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

userSchema.methods.comparePassword = function(candidatePassword) {
    checkPassword = bcrypt.compare(candidatePassword, this.password);
    return checkPassword;
}

module.exports = mongoose.model('user', userSchema)