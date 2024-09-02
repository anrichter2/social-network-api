const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userDataOne, userDataTwo, thoughtData } = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();

    if (userCheck.length) {
        await connection.dropCollection('users');
    };

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();

    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    };

    const userOne = await User.create(userDataOne);

    const thoughtOne = await Thought.create(thoughtData);
    const updateUserOne = await User.findOneAndUpdate(
        { username: userOne.username },
        { $addToSet: { thoughts: thoughtOne._id }},
        { runValidators: true, new: true },
    );

    const userTwo = await User.create(userDataTwo);

    console.info('Seeding complete! 🌱');
    process.exit(0);
})