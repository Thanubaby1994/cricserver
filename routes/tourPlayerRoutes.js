const express = require('express');
const router = express.Router();

const {
  addSinglePlayer,
  updateSinglePlayer,
  updateManyPlayer,
  deleteSinglePlayer,
  getTourPlayersByTournament,
  getUpcomingBids,
  getRecentSolds,
  getTopSolds

} = require('../controllers/tourPlayerController');

router.post('/create', addSinglePlayer);
router.post('/update', updateSinglePlayer);
router.post('/updateMany', updateManyPlayer)
router.post('/delete', deleteSinglePlayer);
router.post('/search', getTourPlayersByTournament);
router.post('/upcoming', getUpcomingBids);
router.post('/recentSolds', getRecentSolds);
router.post('/topSolds', getTopSolds);

module.exports = router
