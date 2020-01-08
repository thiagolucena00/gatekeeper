const { validationResult } = require('express-validator');
const Business = require('./business.model')
const mongoose = require('mongoose');


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
        if(foundBusiness != null)
        {
            return Promise.reject({ errors: [{msg: 'Already exist a business with the informed code'}]});
        }
        return business.save();
    })
    .then((savedBusiness) => {
        req.log.info("Business was added.");
        res.send(savedBusiness);
    })
    .catch(e => res.status(422).json(e));
}

module.exports = {
    // load,
    // get,
    create,
    // update,
    // list,
    // remove,
};