
const mdb = require("../mdb")
const User = require('../models/user.model')

const register = async( req, res ) => {

    try {

        const userData = await User.find({
            "email":req.body.email
        })

        if(userData.length == 0) {

            const user = new User(req.body);
            const result = await user.save();

            res.status(200).json(result)
        }
        else {

            res.status(200).json({message:"User Logged In !"})
        }
        
    } catch (error) {

        res.status(500).json({ message:error.message, isSuccess:false })
    }
}

const profile = async ( req, res ) => {

    res.status(200).json({
        message:"Hello World"
    })
}

module.exports = { register, profile }