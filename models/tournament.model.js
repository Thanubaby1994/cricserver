const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  tournamentType:{
    type: String,
    enum: ["Major", "League"],
    required: true
  },
  imageUrl: {
    type: String
  },
  auctionControlNumber: {
    type: Number,
    default:0
  },
  userEmail: {
    type: String,
    required: true
  }
}, 
{
  timestamps: true 
});

module.exports = mongoose.model('Tournament', tournamentSchema);
