const  { Thought, User } = require('../models');
// const { route } = require('../routes/api/thoughtRoutes');

module.exports = {
    // Get user thoughts:
    getAllThoughts(req, res) {
        Thought.find({})
          .then((thoughtData) => res.json(thoughtData))
          .catch((err) => { console.log(err); res.status(400).json(err);
        });
    },

    // Create a thought
    createThought({ body }, res) {
      Thought.create(body)
        .then((thought) => {
          // locate user created thought and push to the thought's array
          User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: thought._id } }, { new: true })
            .then((user) => {
              if (!user) {
                res.status(404).json({ message: 'Sorry, there was no user found with this ID' });
                return;
              }
              res.json(user);
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.status(400).json(err));
    },
// Add thoughts to user
    addThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
        .then(({ _id }) => {
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
          );
        })
        .then((userData) => {
          if (!userData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(userData);
        })
        .catch((err) => res.json(err));
    },

    // update thoughts:
    updateThought({ params, body }, res) {
      // Find thought by ID and update the body
      Thought.findOneAndUpdate({ _id: params.thoughtid }, body, { new: true, runValidators: true, })
        .then((thoughtData) => {
          if (!thoughtData) {
            res.status(404).json({ message: 'Sorry, there was no thought found with this ID' });
            return;
          }
          res.json(thoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

  // Get thought by ID:
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'Sorry, there was no thought found with this ID' });
          return;
        }
          res.json(thoughtData);
      })
      .catch((err) => {console.log(err); res.status(400).json(err)});
  },

  // Delete thought:
  removeThought({ params }, res) {
    // find the user by ID and then delete
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deleteThought) => {
        if (!deleteThought) {
          return
            res.status(404).json({ message: "Sorry, there was no thought found with this ID" });
        }
        res.json(deletedThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Post new reaction:
  addReaction({ params, body }, res) {
    // find thought by ID and add reaction to reactions set
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "Sorry, there was no thought found with this ID" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
},

  // Delete reaction:
  removeReaction({ params }, res) {
    // find the thought by ID and then remove the reaction via the reaction ID
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'Sorry, there was no thought found with this ID' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
