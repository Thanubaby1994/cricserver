const mongoose = require("mongoose");

const bidConditionSchema = new mongoose.Schema(
  {
    tournamentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true
    },
    bidValue:{
        type:Number,
        required:true,
    },
    increment:{
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

module.exports = mongoose.model("BidCondition", bidConditionSchema);
