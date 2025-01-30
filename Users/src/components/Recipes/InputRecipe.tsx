import React from 'react';
import { TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

interface InputRecipeProps {
  label: string;
  register: UseFormRegister<any>; // טיפוס עבור register
  error?: { message?: string }; // טיפוס עבור error (אופציונלי)
  name: string;
  multiline?: boolean; // טיפוס עבור multiline (אופציונלי)
  rows?: number; // טיפוס עבור rows (אופציונלי)
}
const InputRecipe: React.FC<InputRecipeProps> = ({ label, register, error, name, multiline = false, rows }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...register(name)}
      error={!!error}
      helperText={error ? error.message : ''}
      multiline={multiline}
      rows={multiline ? rows : 1}
    />
  );
};

export default InputRecipe;
