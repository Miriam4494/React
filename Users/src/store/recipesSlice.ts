// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// type Recipe = {
//     id: number,
//     title: string,
//     description:string
// }


// export const fetchData = createAsyncThunk('recipes/fetch',async (_, thunkAPI) => {
//         try {
//             console.log('in async thunk');
//             const response = await axios.get('http://localhost:3000/api/recipes')
//             return response.data
//         }
//         catch (e:any) {
//             return thunkAPI.rejectWithValue(e.message)
//         }
//     }
// )

// export const addRecipe = createAsyncThunk('recipes/add',
//     async (recipe:Recipe, thunkAPI) => {
//         try {
//             console.log('in async thunk');
//             const response = await axios.post('http://localhost:3000/api/recipes',recipe)
//             return response.data.recipe
//         }
//         catch (e:any) {
//             return thunkAPI.rejectWithValue(e.message)
//         }
//     }
// )

// const recipesSlice = createSlice({
//     name: 'recipes',
//     initialState: { list: [] as Recipe[], loading: true },
//     reducers: {
//         // add: (state) => {
//         //     state.list.push({
//         //         id: state.list.length,
//         //         title: 'new recipe'
//         //     })
//         // }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchData.fulfilled,(state, action) => {
//                     console.log('fulfilled');
//                     state.list = [...state.list, ...action.payload]
//                 })
//             .addCase(fetchData.rejected,
//                 (state) => {
//                     console.log('failed');
//                 }
//             )
//             .addCase(addRecipe.fulfilled,
//                 (state, action) => {
//                     console.log('fulfilled');
//                     state.list = [...state.list, action.payload]
//                 })
//             .addCase(addRecipe.rejected,
//                 (state) => {
//                     console.log('failed');
//                 }
//             )
//     }
// });
// //export const { add } = recipesSlice.actions;
// export default recipesSlice;



import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StoreType } from "./store";
export type Recipe = {
    id?: number,

    title: string,
    description: string,
    ingredients: string,
    instructions: string,
}
export const getRecipes = createAsyncThunk('recipes/get', async (_, thunkApi) => {
    try {
        const res = await axios.get("http://localhost:3000/api/recipes");
        return res.data as Recipe[];
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const addRecipe = createAsyncThunk(
    "recipes/add",
    async ({ recipe, userId }: { recipe: Omit<Recipe, "id">; userId: number}, thunkAPI) => {
      try {
        const response = (await axios.post("http://localhost:3000/api/recipes", recipe,
          { headers: { 'user-id': '' + userId } }
        ))
        return response.data.recipe;
      } catch (error: any) {
          console.log(error);
          
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        list: [] as Recipe[],
        loading: true,
        error: null as string | null
    },
    reducers: {
    },
    extraReducers(builder) {
        builder.
            addCase(getRecipes.pending, (state) => {
                //לשים קומפוננטה שמתגלגלת
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.loading = false,
                    state.error = null,
                    state.list = action.payload
            })
            .addCase(getRecipes.rejected, (state) => {
                state.loading = false,
                    state.error = "Failed to load recipes"
            })
            .addCase(addRecipe.pending, (state) => {
                //לשים קומפוננטה שמתגלגלת
                state.loading = true,
                    state.error = null
            })
            .addCase(addRecipe.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.loading = false;
                state.error = null;
                console.log("dskcdms");
                
                state.list.push(...action.payload); // הוספת כל המתכונים למערך
            })
            
          

            .addCase(addRecipe.rejected, (state) => {
                state.loading = false,
                    state.error = "Failed to add recipes"
            })
    }
});
// extraReducers(builder) {
//     builder
//         .addCase(getRecipes.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(getRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
//             state.loading = false;
//             state.error = null;
//             state.list = action.payload;
//         })
//         .addCase(getRecipes.rejected, (state) => {
//             state.loading = false;
//             state.error = "Failed to load recipes";
//         })
//         .addCase(addRecipe.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(addRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
//             state.loading = false; // הוסף שורה זו
//             state.error = null; // הוסף שורה זו
//             state.list.push(action.payload); // הוסף את המתכון החדש לרשימה
//         })
//         .addCase(addRecipe.rejected, (state) => {
//             state.loading = false;
//             state.error = "Failed to add recipe"; // שים לב שהשגיאה כאן מתייחסת למתכון אחד
//         });
// }
 // });
export const selectRecipes = (state: StoreType) => state.recipes;
export const { actions } = recipesSlice; // ייצוא הפעולות

export default recipesSlice;






