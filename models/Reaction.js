const { Schema, Types } = require('mongoose');

// Created a new instance of a mongoose schema to define the shape of reactions
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // Added a getter so whenever a get request for a thought document and its' reactions occurs it will format the date to be more readable for the user
            get: (date) => date.toDateString(),
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    },
);

// Export to thoughts model
module.exports = reactionSchema;