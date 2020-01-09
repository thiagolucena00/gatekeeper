const express = require('express');
const { check } = require('express-validator');
const BusinessService = require('./business.service')

const router = express.Router();

const businessInputHandler = [
  check('code').trim().not().isEmpty().withMessage('must contain a Code').bail()
                      .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check('name').trim().not().isEmpty().withMessage('must contain a Name'),
  check('location').trim().not().isEmpty().withMessage('must contain a Location'),
  check('governanceContact').trim().not().isEmpty().withMessage('must contain a GovernanceContact')
];

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

/** GET /:id - find business data by id */
router.get('/:id', BusinessService.findById);

/** PUT / - create a business data. */
router.put('/create',  businessInputHandler, BusinessService.create);

module.exports = router;
