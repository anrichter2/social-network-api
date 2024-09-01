const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought found with that id '});
            };

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createNewThought(req, res) {
        try {
            const thought = await Thought.create(req.body); //might need to get more specific with the body

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id}},
                { runValidators: true, new: true },
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with that id'});
            };

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with that id' });
            };

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought found with that id' });
            };

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body} },
                { runValidators: true, new: true },
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with that id' });
            };

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: {reactionId: req.params.reactionId}}}, //might need to get rid of s in reactions
                { runValidators: true, new: true },
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought found with that id' });
            };

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};