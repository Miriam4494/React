import Home  from "./components/Home";
import AppLayout from "./components/AppLayot";
import { createBrowserRouter } from "react-router"
import RecipeList from "./components/Recipes/RecipesList";
import AddRecipe from "./components/Recipes/AddRecipe";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>Error. Please try later...</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: 'recipe', element: <RecipeList/> },
            { path: 'addRecipe', element: <AddRecipe/> }
        ]
    }
])