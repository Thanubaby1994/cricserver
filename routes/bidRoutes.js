const express = require('express');
const router = express.Router();

const {
  addSingleBid,
  deleteSingleBid,
  getBid,
  getLastRecord

} = require('../controllers/bidController');

router.post('/create', addSingleBid);
router.post('/delete', deleteSingleBid);
router.post('/search', getBid);
router.post('/lastRecord', getLastRecord);

module.exports = router
