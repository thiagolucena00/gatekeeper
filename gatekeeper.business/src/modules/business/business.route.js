const express = require('express');
const { check, validationResult } = require('express-validator');
const BusinessService = require('./business.service')

const router = express.Router();

const businessInputHandler = [
  check('Code').trim().not().isEmpty().withMessage('must contain a Code').bail()
                      .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
  check('Name').trim().not().isEmpty().withMessage('must contain a Name'),
  check('Location').trim().not().isEmpty().withMessage('must contain a Location'),
  check('GovernanceContact').trim().not().isEmpty().withMessage('must contain a GovernanceContact')
];

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

/** PUT / - Create a business data. */
router.put('/create', businessInputHandler, BusinessService.create);

module.exports = router;
