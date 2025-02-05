import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreType } from "../../store/store";
import { fetchData, Recipe } from "../../store/recipesSlice";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from "@mui/material";
import { ShowRecipe } from "./ShowRecipe";
import UpdateRecipe from "./UpdateRecipe";
import EditIcon from "@mui/icons-material/Edit";
import { UserContext } from "../../AppProvider";
const RecipeList = () => {
    const [showRecipe, setShowRecipe] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
    const recipesList = useSelector((state: StoreType) => state.recipes.list);
    const dispatch = useDispatch<AppDispatch>();
    const [user] = useContext(UserContext);
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    const handleSubmit = (recipe: Recipe) => {
        setShowRecipe(true);
        setCurrentRecipe(recipe);
        setIsEditOpen(false);
    };
    const handleEdit = (recipe: Recipe, isDisabled: boolean) => {
        if (!isDisabled) {
            console.log("Editing recipe:", recipe);
            setCurrentRecipe(recipe);
            setIsEditOpen(true);
        }
    };
    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setCurrentRecipe(null); 
    };
    return (
        <div>
            <Drawer
                anchor="right"
                variant="persistent"
                open={true}
                sx={{
                    "& .MuiDrawer-paper": {
                        marginTop: "85px",
                        backgroundColor: "#f5f5f5",
                        width: "250px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                        display: "flex",
                        flexDirection: "column",
                        height: "calc(100vh - 85px)",
                    },
                }}
            >
                <List sx={{ overflowY: "auto", flexGrow: 1 }}>
                    {recipesList.map((r) => {
                        const isOwner = user?.id == r.authorId;
                        const isDisabled = !user || !isOwner;

                        return (
                            <ListItemButton key={r.id} onClick={() => handleSubmit(r)}>
                                <ListItemIcon style={{ fontSize: "40px" }}>🍴</ListItemIcon>
                                <ListItemText primary={r.title} />
                                <Tooltip title={isDisabled ? "You can't edit this recipe" : "Edit Recipe"}>
                                    <span>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(r, isDisabled);
                                            }}
                                            size="small"
                                            disabled={isDisabled}
                                            sx={{
                                                color: isDisabled ? "gray" : "black",
                                                cursor: isDisabled ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Drawer>
            {showRecipe && currentRecipe && <ShowRecipe recipe={currentRecipe} />}
            {isEditOpen && currentRecipe && (
                <UpdateRecipe
                    recipe={{ ...currentRecipe, id: currentRecipe.id ?? "" }}
                    onClose={handleCloseEdit} 
                />
            )}
        </div>
    );
};
export default RecipeList;


