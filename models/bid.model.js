const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    tournamentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true
    },
    bidPrice:{
        type:Number,
        required:true,
    },
    userEmail: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);
