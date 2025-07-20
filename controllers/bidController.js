const Bid = require( '../models/bid.model')


exports.addSingleBid = async (req, res) => {
  try {
    const { tournamentId, teamId, playerId, bidPrice, userEmail } = req.body;

    const newEntry = new Bid({ tournamentId, teamId, playerId, bidPrice, userEmail  });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: 'Error adding bid.', error: err.message });
  }
};


exports.deleteSingleBid = async (req, res) => {

  try {

    const id = req.body.id;
    const deleted = await Bid.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Player not found in this tournament.' });
    }

    res.json({ message: 'Bid removed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting player.', error: err.message });
  }

};

exports.getBid = async (req, res) => {
  try {
    const condition = req.body.fetchCondition;

    const bids = await Bid.find(condition).populate(
      {
      path:"playerId",
      populate:{
        path:"teamId",
        model:"Team"
      }
    }).populate('teamId')
    .sort({ _id: -1 })
    .limit(5)
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching players.', error: err.message });
  }
};

exports.getLastRecord = async (req, res) => {
  try {

    const condition = req.body.fetchCondition;
    const isDelete = req.body.isDelete;

    if(isDelete) {

        await Bid.findOneAndDelete(condition, {
          sort: { _id: -1 }
        })

        const lastBid = await Bid.findOne(condition)
        .sort({ _id: -1 })
        .populate('teamId playerId');
        res.json(lastBid);

    } else {

      const lastBid = await Bid.findOne(condition)
      .sort({ _id: -1 })
      .populate('teamId playerId');
      res.json(lastBid);
    }

  } catch (err) {
    res.status(500).json({ message: 'Error fetching players.', error: err.message });
  }
};

