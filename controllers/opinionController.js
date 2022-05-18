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

    // Update opinion by ID:
    updateOpinion({ params, body }, res) {
        Opinion.findOneAndUpdate({ _id: params.opinionId }, body, {
            new: true,
            runValidators: true,
        })
        .then((opinionData) => {
            if (!opinionData) {
                res.status(404).JSON({ message: "No comment with ID"});
                return;
            }
            res.JSON(opinionData);
        })
        .catch((err) => res.status(400).JSON(err));
    },

    // Adding an opinion to a user:
    addOpinion({ params, body }, res) {
        console.log(body);
        Opinion.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { opinions: _id }},
                    { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).JSON({ message: "USER ID NOT FOUND"});
                    return;
                }
                res.JSON(userData);
            })
            .catch((err) => res.JSON(err));
    },
    
    // Remove opinion:
    removeOpinion({ params }, res) {
        Opinion.findOneAndDelete({ _id:params.opinionId })
        .then((deleteOpinion) => {
            if (!deleteOpinion) {
                return res.status(404).JSON({ message: "Comment not found with this ID"});
            }
            res.JSON(deleteOpinion);
        })
        .catch((err) => res.status(400).JSON(err));
    },

    // Update opinion by ID:
    updateOpinion({ params, body }, res) {
        Opinion.findOneAndUpdate({ _id: params.opinionId }, body, {
            new: true,
            runValidators:true,
        })
        .then((opinionData) => {
            if (!opinionData) {
                res.status(404).JSON({ message: "No opinion found with this ID"});
                return;
            }
            res.json(opinionData);
        })
        .catch((err) => res.status(400).JSON(err));
    },
    // Add new Reaction
    addReaction({ params, body }, res) {
        Opinion.findOneAndUpdate(
        { _id: params. opinionId }, 
        {$push: { reactions: body } },
        { new: true, runValidators: true }
    )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((dbOpinionData) => {
        if (!dbOpinionData) {
            res
            .status(404)
            .json({ message: "No opinion with this ID!" });
            return;
        }
        res.json(dbOpinionData);
        })
        .catch((err) => res.status(400).json(err));
    },
    
    // Delete a reaction by ID
    removeReaction({ params }, res) {
        Opinion.findOneAndUpdate(
        { _id: params.opinionId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
        )
        .then((dbOpinionData) => {
            if (!dbOpinionData) {
            res
                .status(404)
                .json({ message: "No opinion with this ID!" });
            return;
            }
            res.json(dbOpinionData);
        })
        .catch((err) => res.status(400).json(err));
    },
};