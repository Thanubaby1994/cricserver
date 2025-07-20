const express = require("express");
const router = express.Router();
const {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  searchPlayer
} = require("../controllers/playerController");

router.post("/create", createPlayer); 
router.post("/getAll", getAllPlayers);            
router.post("/get", getPlayerById);          
router.post("/update", updatePlayer);           
router.post("/delete", deletePlayer);  
router.post('/search', searchPlayer);          

module.exports = router;
