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
            required: true,
            minlength: 3
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
 * Statics
 */
BusinessSchema.statics = {
    /**
     * Get business
     * @param {ObjectId} id - The objectId of business.
     * @returns {Promise<business>}
     */
    get(id) {
        return this.findById(id)
            .populate('owner')
            .exec()
            .then((business) => {
                if (business) {
                    return business;
                }
                //   const err = new APIError('No such business exists!', httpStatus.NOT_FOUND, true);
                return Promise.reject(err);
            });
    },

    /**
     * List business and populate owner details to witch the business belongs to.
     * @returns {Promise<business[]>}
     */
    list() {
        return this.find()
            .populate('owner')
            .exec();
    },

    /**
     * List businesses in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of businesses to be skipped.
     * @param {number} limit - Limit number of businesses to be returned.
     * @returns {Promise<business[]>}
     */
    listLazy({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('owner')
            .exec();
    },
};


/**
 * @typedef Business
 */
module.exports = mongoose.model('Business', BusinessSchema);
