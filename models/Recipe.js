const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Recipe title is required'],
        trim: true
    },
    ingredients: [{
        type: String,
        required: [true, 'Ingredients are required']
    }],
    instructions: {
        type: String,
        required: [true, 'Instructions are required']
    },
    cookingTime: {
        type: Number,
        required: [true, 'Cooking time is required']
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);
