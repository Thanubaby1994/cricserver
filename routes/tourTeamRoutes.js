const express = require('express');
const router = express.Router();

const {
  addSingleTeam,
  deleteSingleTeam,
  getTourTeamsByTournament,

} = require('../controllers/tourTeamController')

router.post('/create', addSingleTeam);
router.post('/delete', deleteSingleTeam);
router.post('/search', getTourTeamsByTournament);

module.exports = router
