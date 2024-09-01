const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v')
                // .populate('thoughts friends');

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts friends');

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true},
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that id' });
            };

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                res.status(404).json({ message: 'No user by that id' });
            };

            res.status(200).json(user);
            // add code to delete thoughts when user is deleted
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { friends: req.body }},
                { runValidators: true, new: true },
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that id' })
            };

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId }},
                { runValidators: true, new: true },
            );

            if (!user) {
                res.status(404).json({ message: 'No user with that id' });
            };

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};