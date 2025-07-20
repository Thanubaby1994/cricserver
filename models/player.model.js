const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    playerRef: {
      type: Number,
      unique: true
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    role: {
      type: String,
      enum: ["Batsman", "Bowler", "WicketKeeper", "AllRounder"],
      required: true
    },
    hand: {
      type: String,
      enum: ["Left", "Right"],
      required: true
    },
    imageUrl: {
      type: String
    },
    userEmail: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
