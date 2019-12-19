const express = require('express');
const BusinessService = require('../businessService')
const { check, validationResult } = require('express-validator');

const router = express.Router();

const businessInputHandler = [
  check('Code').trim()
    .not().isEmpty().withMessage('must contain a Code').bail()
    .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check('Name').trim().not().isEmpty().withMessage('must contain a Name'),
  check('Location').trim().not().isEmpty().withMessage('must contain a Location'),
  check('GovernanceContact').trim().not().isEmpty().withMessage('must contain a GovernanceContact')
];

/* PUT business data. */
router.put('/', businessInputHandler, function (req, res) {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  BusinessService.addBusiness(req.body).then(function (result) {
    req.log.info("Business was added.");
    res.send(req.body);
  }, function (err) {
    req.log.error(err);
  });  
});

/* GET ... */
router.get('/teste', function (req, res) {
  req.log.info('something else');
  res.send('test!')
});

module.exports = router;
