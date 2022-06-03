const router = require('express').Router();
const {
    getAllUsers, 
    getUserById, 
    createUser, 
    editUser, 
    deleteUser, 
    addFriend, 
    deleteFriend
} = require('../../controllers/usersController');



module.exports = router;