import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../../store/store";
import { getRecipes, Recipe } from "../../store/recipesSlice";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ShowRecipe } from "./ShowRecipe";

const RecipeList = () => {

    const [showRecipe, setShowRecipe] = useState<boolean>(false);
    const recipesList = useSelector((state: StoreType) => state.recipes.list); // השתמש ב-selector החדש
    const [currentRecipe, setcurrentRecipe] = useState<Recipe>({} as Recipe);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);
    const handleSubmit = (recipe: Recipe) => {
        setShowRecipe(true);
        setcurrentRecipe(recipe);
    }
    return (
        <div>
            <Drawer
                anchor='right'
                variant="persistent"
                open={true}
                sx={{
                    '& .MuiDrawer-paper': {
                        marginTop: '85px',
                        backgroundColor: '#f5f5f5', 
                        width: '250px', 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)', 
                    },}}>
                <List>
                    {recipesList.map((r) => (
                        <ListItemButton key={r.id} onClick={() => handleSubmit(r)}>
                            <ListItemIcon style={{ fontSize: '40px' }}>
                                🍴
                            </ListItemIcon>
                            <ListItemText primary={r.title} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            {showRecipe && <ShowRecipe recipe={currentRecipe} />}
        </div>
    );
};
export default RecipeList;


