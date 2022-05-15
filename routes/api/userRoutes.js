const router = require('express').Router();
const {
    getUserById,
    createUser,
    getAllUsers,
    updateUser,
    addUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/usersController');
const { route } = require('./opinionRoutes');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

route
    .route('/:id/friend/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

    module.exports = router;