const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  profileImage: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true,
        
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    orders: {
        type: Number,
        required: true
    }
    
    
});

const SupplierModel = mongoose.model('suppliers', SupplierSchema);
module.exports = SupplierModel;

