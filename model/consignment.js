const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        email: { type: String, required: true},
        userID: mongoose.Schema.Types.ObjectId,
        addressFrom: { type: String, required: true },
        addressTo: { type: String, required: true },
        pincodeFrom: { type: Number, required: true },
        pincodeTo: { type: Number, required: true },
        weight: { type: Number, required: true },
        phone: { type: Number, required: true },
    }
)

module.exports = mongoose.model('consignment', schema);