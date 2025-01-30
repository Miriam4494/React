import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Typography, Box, Modal } from '@mui/material';
import InputRecipe from './InputRecipe'; 
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addRecipe, Recipe } from '../../store/recipesSlice';
import { userContext } from '../../App';
import {  useNavigate } from "react-router";




interface RecipeFormInputs {
  title: string;
  ingredient: string[];
  description: string;
  instructions: string;
}
const recipeSchema = Yup.object().shape({
    title: Yup.string().required('Recipe title is required').min(3, 'Title must be at least 3 characters'),
    ingredients: Yup.array()
      .of(Yup.string().min(5, 'Each ingredient must have at least 5 characters'))
      .min(1, 'At least one ingredient must be added')
      .required('ingredients are required'),
  });
  
const RecipeForm = () => {
const dispatch = useDispatch<AppDispatch>();
const [user] = useContext(userContext);


  const { register, handleSubmit, control, formState: { errors } } = useForm<RecipeFormInputs>({
    resolver: yupResolver(recipeSchema) as any, // הוספת as any כדי לעקוף בעיות סוגים
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
});

  const onSubmit = (data: RecipeFormInputs) => {
    console.log("afa");
    
    const navigate = useNavigate();

    const newRecipe: Recipe= {
        title: data.title,
        description: data.description,
        instructions: data.instructions,
        ingredients: data.ingredient.join(','),

    };
    console.log(newRecipe);
    
    dispatch(addRecipe({recipe:newRecipe, userId:user.id??0}));
    console.log("bhyj");
    
    navigate("/recipes");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <Typography variant="h6">טופס מתכון</Typography>

      <InputRecipe
        label="שם המתכון"
        register={register}
        error={errors.title}
        name="title"
      />
      
      <Typography variant="h6">מוצרים</Typography>
      {fields.map((item, index) => (
        <div key={item.id}>
          <InputRecipe
            label={`מוצר ${index + 1}`}
            register={register}
            error={errors.ingredient?.[index]}
            name={`products.${index}`}
          />
          <Button onClick={() => remove(index)}>הסר מוצר</Button>
        </div>
      ))}
      <Button onClick={() => append('')} variant="outlined" sx={{ mt: 2 }}>
        הוסף מוצר
      </Button>

      <InputRecipe
        label="תיאור"
        register={register}
        error={errors.description}
        name="description"
      />
      
      <InputRecipe
        label="הוראות הכנה"
        register={register}
        error={errors.instructions}
        name="instructions"
        multiline
        rows={4}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        שלח
      </Button>

    </Box>)
//  <Modal open={true}>
// <Box
//         component="form"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{
//           mt: 2,
//           bgcolor: '#f5f5f5',
//           borderRadius: 2,
//           p: 2,
//           boxShadow: 2,
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '500px',
//           maxHeight: '80vh',
//           overflowY: 'auto',
//         }}
//       >
//         <Typography variant="h5" sx={{ color: '#333', mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
//           Add Recipe
//         </Typography>

//         <Typography variant="h6" sx={{ color: '#555', mb: 1 }}>Title</Typography>
//         <InputRecipe
//           register={register}
//           error={errors.title}
//           name="title"
//           sx={{
//             borderColor: '#555',
//             '&:focus': { borderColor: '#555' },
//           }}
//         />
        
//         <Typography variant="h6" sx={{ color: '#555', mb: 1 }}>Ingredients</Typography>
//         {fields.map((item, index) => (
//           <div key={item.id}>
//             <Typography variant="body1" sx={{ color: '#555' }}>{`Product ${index + 1}`}</Typography>
//             <InputRecipe
//               register={register}
//               error={errors.ingredient?.[index]}
//               name={`products.${index}`}
//               sx={{
//                 borderColor: '#555',
//                 '&:focus': { borderColor: '#555' },
//               }}
//             />
//             <Button onClick={() => remove(index)} sx={{ color: '#fff', bgcolor: '#777', '&:hover': { bgcolor: '#666' }, mt: 1 }}>
//               Remove Product
//             </Button>
//           </div>
//         ))}
        
//         <Button onClick={() => append({})} variant="outlined" sx={{ mt: 2, borderColor: '#555', color: '#555' }}>
//           Add Product
//         </Button>

//         <Typography variant="h6" sx={{ color: '#555', mb: 1 }}>Description</Typography>
//         <InputRecipe
//           register={register}
//           error={errors.description}
//           name="description"
//           multiline
//           rows={3}
//           sx={{
//             borderColor: '#555',
//             '&:focus': { borderColor: '#555' },
//           }}
//         />
        
//         <Typography variant="h6" sx={{ color: '#555', mb: 1 }}>Instructions</Typography>
//         <InputRecipe
//           register={register}
//           error={errors.instructions}
//           name="instructions"
//           multiline
//           rows={3}
//           sx={{
//             borderColor: '#555',
//             '&:focus': { borderColor: '#555' },
//           }}
//         />

//         <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#777', '&:hover': { bgcolor: '#666' } }}>
//           Submit
//         </Button>
//       </Box>
//     </Modal> )
 
};

export default RecipeForm;




// import React, { useContext } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import { addRecipe, Recipe } from "../../store/recipesSlice";
// import { useDispatch, } from "react-redux";
// import { AppDispatch, } from "../../store/store";
// import { userContext} from "../../App"
// import { useNavigate } from "react-router-dom";


// const schema = Yup.object().shape({
//   title: Yup.string().required("יש להזין כותרת"),
//   description: Yup.string().required("יש להזין תיאור"),
//   products: Yup.string().required("יש להזין רשימת מוצרים"),
//   ingredients: Yup.string().required("יש להזין רשימת מרכיבים"),
//   instructions: Yup.string().required("יש להזין הוראות הכנה"),
// });

// const AddRecipe: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Omit<Recipe, "id">>({
//     resolver: yupResolver(schema),
//   });
//   const context = useContext(userContext);


// //   const { list: recipesList, loading, error } = useSelector((store: StoreType) => store.recipes);
//     const dispatch:AppDispatch = useDispatch();
//     const navigate = useNavigate();
//   const onSubmit: SubmitHandler<Omit<Recipe, "id">> = (data) => {

//     const newRecipe = { ...data };
//     dispatch(addRecipe({recipe:newRecipe,userId:context.user.id}));
//     console.log("נתוני הטופס שנשלחו:", data);


//     navigate("/recipes");
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" align="center" gutterBottom>
//         הוספת מתכון חדש
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box display="flex" flexDirection="column" gap={2}>
//           <TextField
//             label="כותרת"
//             {...register("title")}
//             error={!!errors.title}
//             helperText={errors.title?.message}
//             fullWidth
//           />
//           <TextField
//             label="תיאור"
//             {...register("description")}
//             error={!!errors.description}
//             helperText={errors.description?.message}
//             fullWidth
//           />
//           <TextField
//             label="מוצרים"
//             {...register("products")}
//             error={!!errors.products}
//             helperText={errors.products?.message}
//             fullWidth
//           />
//           <TextField
//             label="מרכיבים"
//             {...register("ingredients")}
//             error={!!errors.ingredients}
//             helperText={errors.ingredients?.message}
//             multiline
//             rows={4}
//             fullWidth
//           />
//           <TextField
//             label="הוראות הכנה"
//             {...register("instructions")}
//             error={!!errors.instructions}
//             helperText={errors.instructions?.message}
//             multiline
//             rows={4}
//             fullWidth
//           />
//           <Button type="submit" variant="contained" color="primary">
//             הוסף מתכון
//           </Button>
//         </Box>
//       </form>
//     </Container>
//   );
// };

// export default AddRecipe

