const express = require('express');
const router = express.Router();
const {
  createTournament,
  getAllTournaments,
  updateTournament,
  deleteTournament,
  getTournament
} = require('../controllers/tournamentController');

router.post('/create', createTournament);
router.post('/getAll', getAllTournaments);
router.post('/update', updateTournament); 
router.post('/delete', deleteTournament); 
router.post('/get', getTournament);         

module.exports = router;
