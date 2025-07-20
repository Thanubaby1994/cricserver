const TourTeam = require( '../models/tourteam.model')


exports.addSingleTeam = async (req, res) => {
  try {
    const { tournamentId, teamId, teamFund, userEmail } = req.body;

    const existing = await TourTeam.findOne({ tournamentId, teamId });
    if (existing) {
      return res.status(400).json({ message: 'Team already added to this tournament.' });
    }

    const newEntry = new TourTeam({ tournamentId, teamId, teamFund, userEmail });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Error adding team.', error: err.message });
  }
};


exports.addMultipleTeams = async (req, res) => {
  try {
    const { tournamentId, teamIds, userEmail, timespan } = req.body;

    const newTeams = teamIds.map((teamId) => ({
      tournamentId,
      teamId,
      userEmail,
      timespan,
    }));

    const filteredTeams = await Promise.all(newTeams.map(async (team) => {
      const exists = await TourTeam.findOne({ tournamentId: team.tournamentId, teamId: team.teamId });
      return exists ? null : team;
    }));

    const insertable = filteredTeams.filter(t => t !== null);
    const inserted = await TourTeam.insertMany(insertable);

    res.status(201).json({ added: inserted.length, skipped: teamIds.length - inserted.length });
  } catch (err) {
    res.status(500).json({ message: 'Error adding teams.', error: err.message });
  }
};

exports.deleteSingleTeam = async (req, res) => {
  try {

    const id = req.body.id;
    const deleted = await TourTeam.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Team not found in this tournament.' });
    }

    res.json({ message: 'Team removed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting team.', error: err.message });
  }
};


exports.deleteMultipleTeams = async (req, res) => {
  try {
    const { tournamentId, teamIds } = req.body;

    const result = await TourTeam.deleteMany({
      tournamentId,
      teamId: { $in: teamIds },
    });

    res.json({ message: `Deleted ${result.deletedCount} team(s).` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting teams.', error: err.message });
  }
};

exports.getTourTeamsByTournament = async (req, res) => {
  try {
    const condition = req.body.fetchCondition;

    const teams = await TourTeam.find(condition).populate('teamId');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teams.', error: err.message });
  }
};
