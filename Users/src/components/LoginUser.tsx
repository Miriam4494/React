import axios from "axios"
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { createContext, Dispatch, FormEvent, useReducer, useRef, useState } from "react";
import { action, style, User, UserType } from "./User";
import UserNameAndAvatar from './UserNameAndAvatar'


export const userCotext = createContext<[UserType, Dispatch<action>]>([{} as UserType, () => { }]);
const LoginPage = () => {
    const PasswordRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [status, setStatus] = useState<string>("")
    const [user, userDispatch] = useReducer(User, {} as UserType);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
       
        try {
            const res = await axios.post(`http://localhost:3000/api/user/${status}`,
                {
                    password: PasswordRef.current?.value || "",
                    email: EmailRef.current?.value || "",
                }
            )
            if (status == 'login')
                userDispatch({
                    type: "LOGIN",
                    data: {
                        id: res.data.user.id,
                        password: PasswordRef.current?.value || "",
                        email: EmailRef.current?.value || "",
                        firstName: res.data.user.firstName || "",
                        lastName: res.data.user.lastName || "",
                        address: res.data.user.address || "",
                        phone: res.data.user.phone || "",
                    }
                });
            else
                userDispatch({
                    type: "CREATE",
                    data: {
                        id: res.data.userId,
                        password: PasswordRef.current?.value || "",
                        email: EmailRef.current?.value || "",
                        firstName: "",
                        lastName: "",
                        address: "",
                        phone: "",
                    }
                });
            setIsLogin(true);
            
            
        } catch (e: any) {
            if (e.status === 422 && status == 'register')
                alert('user already sign up 😞');
            if (e.status == 401 && status == 'login')
                alert('user is not register 😞');
        }
        setOpen(false);

    }
    return (<>
        <userCotext.Provider value={[user, userDispatch]}>
            {!isLogin ? <><Button color="primary" variant="outlined" onClick={() => (setOpen(!open), setStatus("login"))}>sing in</Button>
                <Button color="primary" variant="outlined" onClick={() => (setOpen(!open), setStatus("register"))}>sing up</Button></> : <UserNameAndAvatar />}

        </userCotext.Provider>
        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status}</Typography>
                    <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={EmailRef} />
                    <TextField label='userPassword' variant="filled" margin="normal" type="password" fullWidth inputRef={PasswordRef} />
                    <Button color="error" variant="contained" type="submit" fullWidth>{status}</Button>
                </form>
            </Box>
        </Modal>
    </>)
}
export default LoginPage;