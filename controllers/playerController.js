const Player = require("../models/player.model");
const Counter = require("../models/counter.model");

exports.createPlayer = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "player" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newPlayer = new Player({
      ...req.body,
      playerRef: counter.seq
    });

    await newPlayer.save();
    res.status(201).json(newPlayer);

  } catch (err) {
    res.status(500).json({ message: "Failed to create player", error: err });
  }
};

exports.searchPlayer = async (req, res) => {

  try {
    
    const fetchCondition = req.body.fetchCondition;
    const players = await Player.find(fetchCondition).populate('teamId');
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch players', error });
  }

};

exports.getAllPlayers = async (req, res) => {
  try {

    const { teamId, userEmail } = req.body;

    const filter = {};
    if (teamId) filter.teamId = teamId;
    if (userEmail) filter.userEmail = userEmail;

    const players = await Player.find(filter).populate("teamId");
    res.json(players);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch players", error: err });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.body.id).populate("teamId");
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
    
  } catch (err) {
    res.status(500).json({ message: "Error fetching player", error: err });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.body.id, req.body.postData, { new: true });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: "Error updating player", error: err });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.body.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting player", error: err });
  }
};
