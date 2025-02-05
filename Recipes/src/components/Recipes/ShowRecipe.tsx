

import { Box, Typography, Paper, Grid } from "@mui/material";
import { Recipe } from "../../store/recipesSlice";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import CheckIcon from "@mui/icons-material/Check";
import DownloadRecipe from "../DownloadRecipe"; 

export const ShowRecipe = ({ recipe }: { recipe: Recipe }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Box
                    sx={{
                        padding: 2,
                        margin: 2,
                        backgroundColor: "#f5f5f5",
                        borderRadius: "8px",
                        boxShadow: 3,
                    }}
                >
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {recipe.title} <RestaurantIcon fontSize="small" />
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Description:</strong> {recipe.description}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Instructions:</strong> {recipe.instructions}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Ingredients:</strong>
                        </Typography>
                        <div>
                            {Array.isArray(recipe.ingredients)
                                ? recipe.ingredients.map((ingredient, index) => (
                                      <Typography key={index} variant="body2">
                                          <CheckIcon fontSize="small" /> {ingredient}
                                      </Typography>
                                  ))
                                : recipe.ingredients}
                        </div>
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                            <EmojiFoodBeverageIcon fontSize="medium" />
                            <Typography variant="h6" sx={{ marginLeft: 1 }}>
                                Appetite! 😋😊
                            </Typography>
                        </Box>

                        <DownloadRecipe recipe={recipe} />
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    );
};

