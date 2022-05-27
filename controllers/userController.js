const { User, Thought } = require('../models');

// User controller variable

module  .exports = {
    // Get all users:
    getAllUsers(req, res) {
        User.find({})
        .then((userData) => res.json(userData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by ID:
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((userData) => {
            if (!userData) {
                res.status(404).json ({ message: "User ID not found" });
                return;
            }
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Create a User:
    createUser({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    }, 

    // Update user by ID:
    upDateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true,
        })
        .then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "User ID not found" });
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // Add friend:
    addFriend({ params }, res) {
        //   add friend to user Id friend's list.
        User.findOneAndUpdate(
          { _id: params.id },
          { $addToSet: { friends: params.friendId } },
          { runValidators: true }
        )
          .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: "User ID not found" });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(400).json(err));
      },

    // Delete a User:
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((userData) => {
            if (!userData) {
              return res
                .status(404)
                .json({ message: "User ID not found" });
            }
        })
        .then(() => {
          res.json({ message: "User deleted" });
        })
        .catch((err) => res.status(400).json(err));
    },
    
    //   Delete friend:
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { runValidators: true }
        )
          .then((userData) => {
            if (!userData) {
              res.status(404).json({ message: "User ID not found" });
              return;
            }
            res.json(userData);
          })
          .catch((err) => res.status(400).json(err));
      },
};