const BidCondition = require( '../models/bidcondition.model')


exports.addCondition = async (req, res) => {
  try {
    const { tournamentId, bidValue, increment, userEmail } = req.body;

    const newEntry = new BidCondition({ tournamentId, bidValue, increment, userEmail  });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Error adding bid.', error: err.message });
  }
};


exports.deleteCondition = async (req, res) => {

  try {

    const id = req.body.id;
    const deleted = await BidCondition.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Player not found in this tournament.' });
    }

    res.json({ message: 'BidCondition removed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting player.', error: err.message });
  }

};

exports.getCondition = async (req, res) => {
  try {
    const condition = req.body.fetchCondition;

    const conditions = await BidCondition.find(condition)
    res.json(conditions);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching players.', error: err.message });
  }
};

