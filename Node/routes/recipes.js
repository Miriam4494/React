import express from 'express';
import fs from 'fs';
import path from 'path';
import authMiddleware from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db/db.json');

// שליפת כל המתכונים
router.get('/', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.recipes);
});

// הוספת מתכון (רק למשתמש מחובר)
router.post('/', authMiddleware, (req, res) => {
    const {
        title,
        description,
        ingredients,
        instructions
    } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));
    const newRecipe = {
        id: Date.now(),
        title,
        description,
        authorId: req.header('user-id'),
        ingredients,
        instructions,
    };
    db.recipes.push(newRecipe);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    if (newRecipe) {
        res.status(201).json({ message: "Recipe added", recipe: newRecipe });
    } else {
        res.status(403).json({ message: "Failed to add recipe" });
    }
});
//עדכון

router.put('/', authMiddleware, (req, res) => {
    const { id, title, description, ingredients, instructions } = req.body;
    const authId = req.header('user-id'); // זיהוי המשתמש המחובר

    const db = JSON.parse(fs.readFileSync(dbPath));
    const recipe = db.recipes.find(r => r.id === +id);

    if (!recipe)
        return res.status(404).json({ message: "Recipe not found" });

    if (recipe.authorId !== authId)
        return res.status(403).json({ message: "You are not authorized to update this recipe" });

    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(recipe);
});

export default router;
