const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts in database
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();

            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Get a single thought in database
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            //If thought doesn't exist with that id return with message
            if (!thought) {
                res.status(404).json({ message: 'No thought found with that id '});
            };

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new thought
    async createNewThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            // Update the user document tied to this thought
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                // Add thought id to the array of user thoughts
                { $addToSet: { thoughts: thought._id}},
                // run validators and then return updated document of user
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
    // Update a single thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // set the fields of thought document to the values of req.body
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
    // Delete a single thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought found with that id' });
            };

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { runValidators: true, new: true }
            );

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create Reaction
    async createReaction(req, res) {
        try {
            // Reactions don't have there own documents but are instead just part of the thoughts documents so must update thought
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // Add the reaction to the reactions array of thought document
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
    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            // Reactions don't have there own documents but are instead just part of the thoughts documents so must update thought
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                // Pull the reaction from the reaction array of thought document
                { $pull: {reactions: {reactionId: req.params.reactionId}}},
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