import { UseFormRegister } from "react-hook-form";

export type UserKeys = 'firstName' | 'lastName' | 'password' | 'email' | 'address' | 'phone';
export interface RecipeForm {
    id: string;
    title: string;
    ingredients: string[];
    description: string;
    instructions: string;
}
export interface RecipeFormInputs {
  title: string;
  ingredients: string[];
  description: string;
  instructions: string;
}

export interface InputRecipeProps {
  label: string;
  register: UseFormRegister<any>,
  error?: { message?: string };
  name: string;
  multiline?: boolean;
  rows?: number;
}