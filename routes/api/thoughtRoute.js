const router = require('express').Router();
// Import functions from thoughtController file in controller folder
const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createNewThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;