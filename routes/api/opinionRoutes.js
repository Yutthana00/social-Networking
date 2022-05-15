const router = require('express').Router();
const {
    addOpinion,
    getOpinionByID,
    getAllOpinions,
    updateOpinion,
    removeOpinion,
    addReaction,
    removeReaction,
} = require('../../controllers/opinionController');

const { route } = require('./userRoutes');

// Api get all user opinion: api -> opinion
router.route('/').get(getAllOpinions);

// Api post user opinion: api -> opinion -> opinionId 
router.route('/:userId').post(addOpinion);

// Api - opinion - opinionId
router
.route('/:opinionId')
.get(getOpinionByID)
.put(updateOpinion)
.delete(removeOpinion);

router.route('/:opinionId/reactions').post(addReaction);
router.route('/:opinionId/reactions/:reactionID').delete(removeReaction);

module.exports = router;