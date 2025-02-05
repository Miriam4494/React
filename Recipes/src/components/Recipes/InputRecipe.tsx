
import React from 'react';
import { TextField } from '@mui/material';
import { InputRecipeProps } from '../Types&Interfaces';



const InputRecipe: React.FC<InputRecipeProps> = ({ label, register, error, name, multiline = false, rows }) => {
  return (
    <TextField
      label={label}
      variant="filled"
      margin="normal"
      fullWidth
      {...register(name)}
      error={!!error}
      helperText={error ? error.message : ''}
      InputLabelProps={{ style: { color: '#000000' } }}
      multiline={multiline}
      rows={rows}
      sx={{
        '& .MuiFilledInput-root': { borderBottom: '2px solid #000000', '&:before, &:hover:before, &:after': { borderBottom: 'none' } }
      }}
    />
  );
};

export default InputRecipe;
