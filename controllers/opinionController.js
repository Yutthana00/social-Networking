const  { Thought, User } = require('../models');
const { route } = require('../routes/api/thoughtRoutes');

module.exports = {

    // Get thought by ID:
    getThoughtByID({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then((thoughtData) => {
                if (!thoughtData) {
                    res.status(404).json ({ message: "No comments with this ID" });
                    return;
                }
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get all thoughts:
    getAllThoughts(req,res) {
        Thought.find({})
            .then((thoughtData) => res.json(thoughtData))
            .catch ((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Update thought by ID:
    updatethought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators: true,
        })
        .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: "No comment with ID"});
                return;
            }
            res.json(thoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // Adding an thought to a user:
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then((userData) => {
                if (!userData) {
                    res.status(404).json({ message: "USER ID NOT FOUND"});
                    return;
                }
                res.json(userData);
            })
            .catch((err) => res.json(err));
    },
    
    // Remove thought:
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id:params.thoughtId })
        .then((deleteThought) => {
            if (!deleteThought) {
                return res.status(404).json({ message: "Comment not found with this ID"});
            }
            res.json(deleteThought);
        })
        .catch((err) => res.status(400).json(err));
    },

    // Update thought by ID:
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators:true,
        })
        .then((thoughtData) => {
            if (!thoughtData) {
                res.status(404).json({ message: "No thoughts found with this ID"});
                return;
            }
            res.json(thoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // Add new Reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
        { _id: params. thoughtId }, 
        {$push: { reactions: body } },
        { new: true, runValidators: true }
    )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res
            .status(404)
            .json({ message: "No thought with this ID!" });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    
    // Delete a reaction by ID
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
            res
                .status(404)
                .json({ message: "No thought with this ID!" });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
};