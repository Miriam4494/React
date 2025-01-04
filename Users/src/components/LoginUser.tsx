import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { createContext, Dispatch, FormEvent, useReducer, useRef, useState } from "react";
import { action, style, User, UserType } from "./User";
import UserNameAndAvatar from './UserNameAndAvatar'

export const userCotext = createContext<[UserType, Dispatch<action>]>([{} as UserType, () => { }]);
const LoginPage = () => {
    const PasswordRef = useRef<HTMLInputElement>(null)
    const FirstNameRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [user, userDispatch] = useReducer(User, {} as UserType);
    

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLogin(false);
        setOpen(false);
        userDispatch(
            {
                type: "CREATE",
                data: {
                    password: PasswordRef.current?.value || "",
                    firstName: FirstNameRef.current?.value || "",
                    lastName: '',
                    address: '',
                    phone: '',
                    email: ''
                }
            });
    };
    return (<>
        {isLogin &&
            <Box
                component="section"
                sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    p: 5,
                    border: '2px dashed black',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>Home</Box>}
        <userCotext.Provider value={[user, userDispatch]}>
            {isLogin ? <Button color="primary" variant="outlined" onClick={() => setOpen(!open)}>Login</Button> : <UserNameAndAvatar />}
        </userCotext.Provider>
        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>Login</Typography>
                    <TextField label='userName' variant="filled" margin="normal" fullWidth inputRef={FirstNameRef} />
                    <TextField label='userPassword' variant="filled" margin="normal" type="password" fullWidth inputRef={PasswordRef} />
                    <Button color="error" variant="contained" type="submit" fullWidth>Login</Button>
                </form>
            </Box>
        </Modal>
    </>)
}
export default LoginPage;