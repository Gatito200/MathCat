const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    mensaje: {
        type: String,
        required: true,
        maxlength: 1000
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Contact",
    contactSchema
);