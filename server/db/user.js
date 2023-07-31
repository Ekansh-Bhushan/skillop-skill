const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    phoneNumber: String,
    created: {
        type: Date,
        default: Date.now
    },
    expertise: [{
        type: String,
    }],
    about: { type: String, default: '' },
    pastExp: { type: String, default: '' },
    futurePlans: { type: String, default: '' },
    linkedinId: { type: String, default: '' },
    upiId: { type: String, default: '' },
    step1: {
        type: Boolean,
        default: false
    },
    step3: {
        type: Boolean,
        default: false
    },
    
})

module.exports = mongoose.model('users', UserSchema);