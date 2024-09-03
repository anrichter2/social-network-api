const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userDataOne, userDataTwo, thoughtDataOne, thoughtDataTwo } = require('./data')

connection.on('error', (err) => err);

// Connect to database
connection.once('open', async () => {
    // Check if database has collection of users
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();

    // If database has collection of users dump the collection
    if (userCheck.length) {
        await connection.dropCollection('users');
    };

    // Check if database has collection of thoughts
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();

    // if database has collection of thoughts dump the collection
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    };

    //Seed database with a new user
    const userOne = await User.create(userDataOne);

    // Seed the database with a new thought tied to previous user
    const thoughtOne = await Thought.create(thoughtDataOne);
    const updateUserOne = await User.findOneAndUpdate(
        { username: userOne.username },
        { $addToSet: { thoughts: thoughtOne._id }},
        { runValidators: true, new: true },
    );

    //Create a second user with no thoughts yet
    const userTwo = await User.create(userDataTwo);

    const thoughtTwo = await Thought.create(thoughtDataTwo);
    const updateUserTwo = await User.findOneAndUpdate(
        { username: userTwo.username },
        { $addToSet: { thoughts: thoughtTwo._id }},
        { runValidators: true, new: true },
    );

    console.info('Seeding complete! 🌱');
    process.exit(0);
})