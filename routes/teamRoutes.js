const express = require('express');
const router = express.Router();
const {
  createTeam,
  getAllTeams,
  updateTeam,
  deleteTeam,
  getTeam,
  searchTeam
} = require('../controllers/teamController');

router.post('/create', createTeam);
router.post('/getAll', getAllTeams);
router.post('/update', updateTeam); 
router.post('/delete', deleteTeam); 
router.post('/get', getTeam);    
router.post('/search', searchTeam);      

module.exports = router;
