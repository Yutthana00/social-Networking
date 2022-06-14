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

const { route } = require('./userRoutes');

// Api get all user thoughts and create thought:
router.route('/').get(getAllThoughts);

router.route("/:thoughtId").get(getThoughtByID).put(updateThought).delete(removeThought);

router.route('/:useId').post(addThought);

// Api add and delete reactions:
router.route('/:thoughtId/reactions/:reactionID').delete(removeReaction);

router.route("/:thoughtId.reactions").post(addReaction);

module.exports = router;