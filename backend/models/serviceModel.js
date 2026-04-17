const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minLength: 50,
        maxLength: 500
    },
    category: {
        type: String,
        required: true,
        enum: ['Pediatric Dentistry', 'Orthodontics', 'Precision Dentures','Cosmetic Dentistry','Restorative Dentistry','Specialized Services']
    },
    subCat: {
        type: Array,
        default: []
    },
    img_url: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        min: 0
    },
    imagePublicId: {
        type: String,
    }
}, {timestamps: true })

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;