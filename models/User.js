const { Schema, model } = require('mongoose');

// Creating a new instance of a mongoose schema to define the shape of user documents
const UserSchema = new Schema(
    {
        username: { 
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
            // Making sure that any inputted email will match a regular expression
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        },
        // Thought array references ObjectId's of thought documents
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            },
        ],
        // Friends array references ObjectId's of other user documents
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Creating a virtual that will calculate and display the number of friends a user has during a get request
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Creating a mongoose model based on the userSchema
const User = model('user', UserSchema);

module.exports = User;