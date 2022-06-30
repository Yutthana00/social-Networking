const router = require('express').Router();

const {
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend
} = require('../../controllers/userController');
// Call all users, create new users:
router.route('/').get(getAllUsers).post(createUser);
// Get user by id, edit user and delete user:
router.route("/:id")
.get(getUserById)
// .put(updateUser)
.delete(deleteUser);
// Add and delete friends:
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;