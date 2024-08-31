const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController.js');

router.use('/').get(getThoughts).post(createNewThought);

router.use('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.use('/:thoughtId/reactions').post(createReaction);

router.use('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;