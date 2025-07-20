const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
        type:String
    },
    photoUrl:{
        type:String
    },
    phoneNumber: {
        type:String
    },
    isBlock : {
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
