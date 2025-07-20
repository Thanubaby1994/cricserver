const express = require('express');
const router = express.Router();

const {
  addCondition,
  deleteCondition,
  getCondition,

} = require('../controllers/bidConditionController');

router.post('/create', addCondition);
router.post('/delete', deleteCondition);
router.post('/search', getCondition);

module.exports = router
