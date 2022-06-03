const router = require('express').Router();
const {
    addThought,
    getThoughtByID,
    getAllThoughts,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

const { route } = require('./userRoutes');

// Api get all user thought: api -> thought
router.route('/').get(getAllThoughts);

// Api post user thought: api -> thought -> thoughtId 
router.route('/:userId').post(addThought);

// Api - thought - thoughtId
router
.route('/:thoughtId')
.get(getThoughtByID)
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionID').delete(removeReaction);

module.exports = router;