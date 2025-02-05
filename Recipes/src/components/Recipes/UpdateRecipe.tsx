import { useContext, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button, Typography, Box, Modal, IconButton } from '@mui/material';
import InputRecipe from './InputRecipe';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { updateRecipe } from '../../store/recipesSlice';
import { UserContext } from '../../AppProvider';
import { useNavigate } from "react-router";
import { Delete, Close } from '@mui/icons-material';
import { styleModal } from '../Style';
import { RecipeForm } from '../Types&Interfaces';

const recipeSchema = Yup.object().shape({
    title: Yup.string().required('Recipe title is required').min(3, 'Title must be at least 3 characters'),
    ingredients: Yup.array()
        .of(Yup.string().min(5, 'Each ingredient must have at least 5 characters'))
        .min(1, 'At least one ingredient must be added')
        .required('Ingredients are required'),
});
const UpdateRecipe = ({ recipe, onClose }: { recipe: RecipeForm, onClose: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<RecipeForm>({
        resolver: yupResolver(recipeSchema) as any,
        defaultValues: recipe,
    });
    useEffect(() => {
        setValue("title", recipe.title);
        setValue("description", recipe.description);
        setValue("instructions", recipe.instructions);
        setValue("ingredients", recipe.ingredients);
    }, [recipe, setValue]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients' as never
    });
    const onSubmit: SubmitHandler<RecipeForm> = (data) => {
        const updatedRecipe = {
            id: recipe.id,
            title: data.title,
            description: data.description,
            instructions: data.instructions,
            ingredients: data.ingredients,
        }
        dispatch(updateRecipe({ recipe: updatedRecipe, userId: user.id?.toString() ?? '' }));
        onClose();
        navigate("/recipes");
    };

    return (
        <Modal open={true}>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={styleModal}
            >
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }} > <Close /> </IconButton>
                <Typography variant="h5" sx={{ color: '#000000', mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Update Recipe
                </Typography>
                <InputRecipe label="Title" register={register} error={errors.title} name="title" />
                <Typography variant="h6" sx={{ color: '#555', mb: 1 }}>Ingredients</Typography>
                {fields.map((item, index) => (
                    <div key={item.id}>
                        <Typography variant="body1" sx={{ color: '#555' }}>{`Product ${index + 1}`}</Typography>
                        <InputRecipe
                            label={`Product ${index + 1}`}
                            register={register}
                            error={errors.ingredients?.[index]}
                            name={`ingredients.${index}`}
                        />
                        <IconButton onClick={() => remove(index)} sx={{ color: 'red', mt: 1 }} ><Delete /></IconButton>
                    </div>
                ))}
                <Button onClick={() => append('')} variant="outlined" sx={{ mt: 2, borderColor: '#555', color: '#555' }}>
                    Add Product
                </Button>
                <InputRecipe label="Description" register={register} error={errors.description} name="description" multiline rows={3} />
                <InputRecipe label="Instructions" register={register} error={errors.instructions} name="instructions" multiline rows={3} />
                <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: '#777', '&:hover': { bgcolor: '#666' } }}>
                    Update
                </Button>
            </Box>
        </Modal>
    );
};
export default UpdateRecipe;
