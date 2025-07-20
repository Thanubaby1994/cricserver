const Tournament = require('../models/tournament.model');

exports.createTournament = async (req, res) => {
  try {
    const tournament = new Tournament( req.body );
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create tournament', error });
  }
};


exports.getAllTournaments = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const tournaments = await Tournament.find({ userEmail });
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tournaments', error });
  }
};


exports.updateTournament = async (req, res) => {
  try {
    const tournamentId = req.body.id;
    const updates = req.body.postData;
    const updatedTournament = await Tournament.findByIdAndUpdate(tournamentId, updates, { new: true });
    if (!updatedTournament) return res.status(404).json({ message: 'Tournament not found' });
    res.status(200).json(updatedTournament);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update tournament', error });
  }
};


exports.deleteTournament = async (req, res) => {
  try {
    const tournamentId = req.body.id;
    const deletedTournament = await Tournament.findByIdAndDelete(tournamentId);
    if (!deletedTournament) return res.status(404).json({ message: 'Tournament not found' });
    res.status(200).json({ message: 'Tournament deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete tournament', error });
  }
};

exports.getTournament = async( req, res) => {
  try {
    const tournament = await Tournament.findById(req.body.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tournament', error: err });
  }
}
