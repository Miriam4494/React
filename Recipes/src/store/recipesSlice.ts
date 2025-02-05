import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
export type Recipe = {
  id?: string,
  title: string,
  description: string,
  ingredients: string[]
  instructions: string,
  authorId?:number
}
interface RecipesState {
  list: Recipe[];
  loading: boolean;
  error: string | null;
}
const initialState: RecipesState = {
  list: [],
  loading: false,
  error: null,
};
export const fetchData = createAsyncThunk("recipes/fetch", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:3000/api/recipes");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const updateRecipe = createAsyncThunk(
  "recipes/update",
  async ({ recipe, userId }: { recipe: Partial<Recipe>, userId: string }, thunkAPI) => {
    try {
      const response = (await axios.put("http://localhost:3000/api/recipes", recipe,
        { headers: { 'user-id': '' + userId } }
      ))
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  })
export const addRecipe = createAsyncThunk(
  "recipes/add",
  async ({ recipe, userId }: { recipe: Omit<Recipe, "id">; userId: number }, thunkAPI) => {
    try {
      const response = (await axios.post("http://localhost:3000/api/recipes", recipe,
        { headers: { 'user-id': userId } }
      ))
      return response.data.recipe;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Error fetching recipes";
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Error adding recipe";
        Swal.fire({ title: "Add rejected", icon: "error", draggable: true });
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.list.push(action.payload);
        Swal.fire({ title: "Add successfully", icon: "success", draggable: true });
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message || "Error update recipe";
        Swal.fire({ title: "Update rejected", icon: "error", draggable: true });
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
          Swal.fire({ title: "Update successfully", icon: "success", draggable: true });
        }
      });
  },
});
export default recipesSlice;
