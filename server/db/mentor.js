const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    phoneNumber: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    },
    expertise: [{
        type: String,
    }],
    availability: {
        monday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }],
        tuesday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }],
        wednesday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }],
        thusday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }],
        friday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }],
        saturday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }],
        sunday: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }],

    },
    availabilityString:{
        monday: {
            type: String,
            default: ""
        },
        tuesday: {
            type: String,
            default: ""
        },
        wednesday: {
            type: String,
            default: ""
        },
        thursday: {
            type: String,
            default: ""
        },
        friday: {
            type: String,
            default: ""
        },
        saturday: {
            type: String,
            default: ""
        },
        sunday: {
            type: String,
            ref: "orders"
        },
    },
    step1: {
        type: Boolean,
        default: false
    },
    step2: {
        type: Boolean,
        default: false
    },
    step3: {
        type: Boolean,
        default: false
    },
    about: { type: String, default: '' },
    pastExp: { type: String, default: '' },
    futurePlans: { type: String, default: '' },
    linkedinId: { type: String, default: '' },
    upiId: { type: String, default: '' },
    chargePerHour: { type: Number, default:300}
})

module.exports = mongoose.model('mentors', MentorSchema);