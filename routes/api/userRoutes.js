const router = require('express').Router();
const {
    getAllUsers, 
    getUserById, 
    createUser, 
    editUser, 
    deleteUser, 
    addFriend, 
    deleteFriend
} = require('../../controllers/userController');
// Call all users, create new users:
router.route('/').get(getAllUsers).post(createUser);
// Get user by id, edit user and delete user:
router.route('/:id').get(getUserById).put(editUser).delete(deleteUser);
// Add and delete friends:
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;