const router = require('express').Router();
const { route } = require('./userRoutes');
const {
    getAllThoughts,
    addThought,
    removeThought,
    updateThought,
    removeReaction,
    addReaction,
    getThoughtById,

} = require('../../controllers/thoughtController');


// Api get all user thoughts and create thought:
router.route('/').get(getAllThoughts);
router.route('/:useId').post(addThought);

router
.route("/:thoughtId")
.get(getThoughtById) 
.put(updateThought)
.delete(removeThought);

router.route('/:thoughtId.reactions').post(addReaction);

// Api add and delete reactions:
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;