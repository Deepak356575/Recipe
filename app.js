const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Recipe = require('./models/Recipe');


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json({
            count: recipes.length,
            recipes: recipes
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching recipes'
        });
    }
});

app.post('/api/recipes', async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                recipe: newRecipe
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Invalid data sent!'
        });
    }
});

app.get('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({
                status: 'fail',
                message: 'Recipe not found'
            });
        }
        res.json({
            status: 'success',
            data: {
                recipe: recipe
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching recipe'
        });
    }
});

app.put('/api/recipes/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedRecipe) {
            return res.status(404).json({
                status: 'fail',
                message: 'Recipe not found'
            });
        }
        res.json({
            status: 'success',
            data: {
                recipe: updatedRecipe
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Invalid data sent!'
        });
    }
});


app.delete('/api/recipes/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({
                status: 'fail',
                message: 'Recipe not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting recipe'
        });
    }
});



app.use('/api/recipes', require('./routes/recipeRoutes'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
