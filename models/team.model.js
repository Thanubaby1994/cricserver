const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: true
  },
  teamType:{
    type: String,
    enum: ["Major", "League"],
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
{
  timestamps: true 
});

module.exports = mongoose.model('Team', teamSchema);
