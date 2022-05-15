const  { Opinion, User } = require('../models');
const { route } = require('../routes/api/opinionRoutes');

module.exports = {
    
    // Get opinion by ID:
    getOpinionByID({ params }, res) {
        Opinion.findOne({ _id: params.opinionId })
            .then((opinionData) => {
                if (!opinionData) {
                    res.status(404).JSON ({ message: "No comments with this ID" });
                    return;
                }
                res.JSON(opinionData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).JSON(err);
            });
    },

    // Get all opinions:
    getAllOpinions(req,res) {
        Opinion.find({})
            .then((opinionData) => res.JSON(opinionData))
            .catch ((err) => {
                console.log(err);
                res.status(400).JSON(err);
            });
    },



}