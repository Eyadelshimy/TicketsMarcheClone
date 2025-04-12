const userModel = require("../models/User");
require("dotenv").config();

const userController = {

    //get
    getAllUsers: async (req, res) => {
        try{
            const users = await userModel.find();
            res.status(200).json(users);
        }
        catch(err){
            res.status(500).json({error:err});
        }

    },

    //get
    getUser: async (req, res) => {
       try {
           const user = await userModel.findOne({userID: req.params.id});
           res.status(200).json(user);
       }
       catch(err){
           res.status(500).json({error:err});
       }
    },

    //put
    updateUser: async (req, res) => {
        try{
            const user = await userModel.findOneAndUpdate(
                {userID: req.params.id},
                {role: req.body.role},
                {new: true}
            );

            res.status(200).json({user, message: "User updated successfully" });
        }
        catch (err){
            res.status(500).json({error:err});
        }
    },

    //delete
    deleteUser: async (req, res) => {
        try{
            const user = await userModel.findOneAndDelete(
                {userID: req.params.id},
                {new: true}
            );
            res.status(200).json({user, message: "User deleted successfully" });
        }
        catch (err){
            res.status(500).json({error:err});
        }
    }

}

module.exports = userController;
