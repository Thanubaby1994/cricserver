const mongoose = require('mongoose');

const tourPlayerSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament',
      required: true
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true
    },
    basePrice:{
        type:Number,
        required:true,
    },
    bidStatus:{
        type:String,
        default:'AWAIT'
    },
    soldStatus:{
        type:String,
        default:'AWAIT'
    },
    currentBid:{
        type:Number,
        default:0
    },
    bidTeam:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Team',
      default:null
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

module.exports = mongoose.model('TourPlayer', tourPlayerSchema);
