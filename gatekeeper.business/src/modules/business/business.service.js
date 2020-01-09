const { validationResult } = require('express-validator');
const Business = require('./business.model')
const APIError = require('../../lib/APIError');


function create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    req.log.info("Adding business input.");

    const business = new Business(req.body);

    Business.findOne({ code: business.code })
        .exec()
        .then((foundBusiness) => {
            if (foundBusiness !== null) {
                return Promise.reject(new APIError('Already exist a business with the informed code', 422));
            }
            return business.save();
        })
        .then((savedBusiness) => {
            req.log.info("Business was added.");
            res.send(savedBusiness);
        })
        .catch(next);
}

function findById(req, res, next) {
    let parameter = req.params.id;

    Business.findById(parameter)
        .exec()
        .then((foundBusiness) => {
            if (foundBusiness === null) {
                return Promise.reject(new APIError(`business ${parameter} does not exists`, 204));
            }
            res.json(foundBusiness);
        })
        .catch(next);
}

function findByCode(req, res, next) {
    let parameter = req.params.code;

    Business.findOne({ code: parameter })
        .exec()
        .then((foundBusiness) => {
            if (foundBusiness === null) {
                return Promise.reject(new APIError(`business ${parameter} does not exists`, 204));
            }
            res.json(foundBusiness);
        })
        .catch(next);
}
module.exports = {
    // load,
    findById,
    findByCode,
    create,
    // update,
    // list,
    // remove,
};