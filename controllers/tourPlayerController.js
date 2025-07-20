const TourPlayer = require( '../models/tourplayer.model')


exports.addSinglePlayer = async (req, res) => {
  try {
    const { tournamentId, playerId, basePrice, userEmail } = req.body;

    const existing = await TourPlayer.findOne({ tournamentId, playerId });
    if (existing) {
      return res.status(400).json({ message: 'Player already added to this tournament.' });
    }

    const newEntry = new TourPlayer({ tournamentId, playerId, basePrice, userEmail });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Error adding player.', error: err.message });
  }
};

exports.updateSinglePlayer = async (req, res) => {

  try {

    const { bidStatus, currentBid, bidTeam } = req.body.postData;
    const id = req.body.id;

    const result = await TourPlayer.findByIdAndUpdate(id, { bidStatus, currentBid, bidTeam });
    res.status(201).json(result);

  } catch (err) {
    res.status(500).json({ message: 'Error updating player.', error: err.message });
  }

};

exports.updateManyPlayer = async (req, res) => {

  try {

    const updateCondition= req.body.updateCondition;
    const updateData = req.body.updateData;

    const result = await TourPlayer.updateMany(
      updateCondition,
      {
        $set:updateData
      }
    );
    res.status(201).json(result);

  } catch (err) {
    res.status(500).json({ message: 'Error updating player.', error: err.message });
  }

};


exports.deleteSinglePlayer = async (req, res) => {
  try {

    const id = req.body.id;
    const deleted = await TourPlayer.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Player not found in this tournament.' });
    }

    res.json({ message: 'Player removed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting player.', error: err.message });
  }
};


exports.getTourPlayersByTournament = async (req, res) => {

  try {

    const condition = req.body.fetchCondition;

    const players = await TourPlayer.find(condition).populate(
      {
      path:"playerId",
      populate:{
        path:"teamId",
        model:"Team"
      }
    }).populate('bidTeam')
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players.', error: err.message });
  }

};

exports.getUpcomingBids = async ( req, res) => {

    try {

    const condition = req.body.fetchCondition;

    const players = await TourPlayer.find(condition).populate(
      {
      path:"playerId",
      populate:{
        path:"teamId",
        model:"Team"
      }
    }).populate('bidTeam').sort({ basePrice: -1 }).limit(10);
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players.', error: err.message });
  }

} 

exports.getRecentSolds = async ( req, res) => {
    try {

    const condition = req.body.fetchCondition;

    const players = await TourPlayer.find(condition).populate(
      {
      path:"playerId",
      populate:{
        path:"teamId",
        model:"Team"
      }
    }).populate('bidTeam').sort({ updatedAt: -1 }).limit(10);
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players.', error: err.message });
  }
}

exports.getTopSolds = async ( req, res) => {
    try {

    const condition = req.body.fetchCondition;

    const players = await TourPlayer.find(condition).populate(
      {
      path:"playerId",
      populate:{
        path:"teamId",
        model:"Team"
      }
    }).populate('bidTeam').sort({ currentBid: -1 }).limit(10);
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players.', error: err.message });
  }
}

