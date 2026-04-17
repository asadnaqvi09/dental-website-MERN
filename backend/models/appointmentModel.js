const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(e){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e);
            },
            message: props => `${props.value} is not valid email address!`
        }
    },
    phoneNo:{
        type: String,
        required: true
    },
    ServiceCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
},{timestamps: true})

appointmentSchema.index({ date: 1, time: 1 , ServiceCategory: 1}, { unique: true });
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;