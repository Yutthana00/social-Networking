const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtByID,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thoughtController');

// Api get all user thoughts and create thought:
router.route('/').get(getAllThoughts).post(createThought);

// Api get, put and delete thoughts:
router.route('/:id').get(getThoughtById).put(editThought).delete(deleteThought);

// Api add and delete reactions:
router.route('/:thoughtId/reactions/').post(addReaction).delete(deleteReaction);

module.exports = router;