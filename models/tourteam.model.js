const mongoose = require('mongoose');

const tourTeamSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true
    },
    teamFund:{
        type:Number,
        required:true,
    },
    userEmail: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('TourTeam', tourTeamSchema);
