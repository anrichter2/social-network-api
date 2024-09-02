const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .select('-__v')

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            // Remove the __v from the returned JSON response.
            .select('-__v')
            // Populate the thoughts and friends arrays with full information of this users thoughts and friends instead of just their _id's
            .populate('thoughts friends');

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update user information
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                // set user fields to the values of req.body
                { $set: req.body },
                // run validators and return updated document
                { runValidators: true, new: true},
            );

            // If no user with this id then return message
            if (!user) {
                res.status(404).json({ message: 'No user with that id' });
            };

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            // If the user has thoughts in their thoughts array
            if (user.thoughts.length) {
                // Loop through thoughts array
                for (let i = user.thoughts.length; i > 0; i--) {
                    // Find and delete each individual thought
                    const thoughts = await Thought.findOneAndDelete({ _id: user.thoughts[i - 1] })
                }
            };

            if (!user) {
                res.status(404).json({ message: 'No user by that id' });
            };

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a friend to the user document
    async addFriend(req, res) {
        try {
            // Update a user document with a reference to another user documents _id
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId},
                // Add the friends _id to the friends array of user document
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
    // Remove a friend to the user document
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                // pull the friends _id out of friends array of user document
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