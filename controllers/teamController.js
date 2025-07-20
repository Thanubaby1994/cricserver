const Team = require('../models/team.model');

exports.createTeam = async (req, res) => {
  try {
    //const { name, shortName, teamType, imageUrl, userEmail } = req.body;
    const team = new Team( req.body );
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create team', error });
  }
};


exports.getAllTeams = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const teams = await Team.find({ userEmail });
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
};

exports.searchTeam = async (req, res) => {

  try {
    const fetchCondition = req.body.fetchCondition;
    const teams = await Team.find( fetchCondition );
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }

};


exports.updateTeam = async (req, res) => {
  try {
    const teamId = req.body.id;
    const updates = req.body.postData;
    const updatedTeam = await Team.findByIdAndUpdate(teamId, updates, { new: true });
    if (!updatedTeam) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update team', error });
  }
};


exports.deleteTeam = async (req, res) => {
  try {
    const teamId = req.body.id;
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) return res.status(404).json({ message: 'Team not found' });
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete team', error });
  }
};

exports.getTeam = async( req, res) => {
  try {
    const team = await Team.findById(req.body.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team', error: err });
  }
}
