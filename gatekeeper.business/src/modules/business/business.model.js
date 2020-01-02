const mongoose = require('mongoose');


/**
 * Business Schema
 */
const BusinessSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Business'
        },
        code: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        name: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        location: {
            type: mongoose.Schema.Types.String,
            required: true
        },
        governanceContact: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    }
);

/**
 * @typedef Business
 */
module.exports = mongoose.model('Business', BusinessSchema);
