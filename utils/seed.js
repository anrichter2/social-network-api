const connection = require('../config/connection');
const { User, Thought } = require('../models');

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

    const thought = {
        thoughtText: "Here's a cool thought",
        username: "lernantino",
    };

    const thoughtData = await Thought.create(thought);

    await User.create(
        {
            username: "lernantino",
            email: "lernantino@gmail.com",
            thoughts: [...thoughtData.map(({_id}) => _id)],
        }
    );

    console.table(thought);
    console.info('Seeding complete! 🌱');
    process.exit(0)
})