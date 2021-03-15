const { Schema, model } = require('mongoose');

const carScheme = new Schema({
    type: {type: String},
    model: { type: String },
    price: { type: Number },
    prodYear: {type: Number},
    color: {type: String},
    crushed: {type: Boolean},
    photos: [{ type: String }],
    files: [{ type: String }],
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('Car', carScheme);
