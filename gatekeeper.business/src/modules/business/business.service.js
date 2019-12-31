const { validationResult } = require('express-validator');

function create(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    req.log.info("Adding business input.");
    // create a model 
    req.log.info("Business was added.");

    return res.send(req.body);
}

module.exports = {
    // load,
    // get,
    create,
    // update,
    // list,
    // remove,
};