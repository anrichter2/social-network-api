const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Creating a new instance of a mongoose schema to define the shape of thought documents
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // Added a getter so whenever a get request for a thought document occurs it will format the date to be more readable for the user
            get: (date) => date.toDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        // reactions array uses the shape of imported reactionSchema
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

// Created a virtual that will calculate and display the number of reactions a though has during a get request
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Creating a mongoose model based on thoughtSchema
const Thought = model('thought', thoughtSchema);

module.exports = Thought;