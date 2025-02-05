import axios from "axios";
import { Button, Modal, Box, TextField, Typography, IconButton } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { styleBox } from "../Style";
import UserNameAndAvatar from './UserNameAndAvatar';
import { UserContext } from "../../AppProvider";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Swal from "sweetalert2";
const LoginPage = () => {
    const PasswordRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [status, setStatus] = useState<string>("")
    const [, userDispatch] = useContext(UserContext);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/api/user/${status}`, {
                password: PasswordRef.current?.value || "",
                email: EmailRef.current?.value || "",
            })
            if (status === 'login') {
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
            } else {
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
            }
            setIsLogin(true);
        } catch (e: any) {
            if (e.response?.status === 400 && status === 'register')
                Swal.fire({ icon: "error", title: "Oops...", text: "User already signed up 😞!", footer: 'Please sign in' });
            if (e.response?.status === 401 && status === 'login')
                Swal.fire({ icon: "error", title: "Oops...", text: "User is not registered 😞!", footer: 'Please sign up' });
        }
        setOpen(false);
    }
    return (<>
        <AppBar position="static" style={{ backgroundColor: '#C62828', height: '70px', zIndex: 1 }}>
            <Toolbar style={{ minHeight: '70px' }}>
                {isLogin ? (<UserNameAndAvatar />) :
                    (['Sign In', 'Sign Up'].map((text, index) => (
                        <Button
                            key={text}
                            startIcon={index === 0 ? <LoginIcon /> : <PersonAddIcon />}
                            sx={{ margin: 1, color: '#FFFFFF', border: '2px #FFFFFF solid' }}
                            variant="outlined"
                            onClick={() => { setOpen(true), setStatus(index === 0 ? "login" : "register") }}>{text}
                        </Button>))
                    )}
            </Toolbar>
        </AppBar>
        <Modal open={open}>
            <Box sx={styleBox}>
                <form onSubmit={handleSubmit}>
                    <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', top: 10, right: 10 }}><CloseIcon /></IconButton>
                    <Typography variant="h5" sx={{ color: '#000000', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status}</Typography>
                    {['userEmail', 'userPassword'].map((label) => (
                        <TextField key={label} label={label} variant="filled" margin="normal"
                            type={label === 'userEmail' ? 'email' : 'password'} fullWidth
                            inputRef={label === 'userEmail' ? EmailRef : PasswordRef}
                            InputLabelProps={{ style: { color: '#000000' } }}
                            sx={{
                                '& .MuiFilledInput-root': { borderBottom: '2px solid #000000', '&:before, &:hover:before, &:after': { borderBottom: 'none' } }
                            }} />
                    ))}
                    <Button color="error" variant="contained" type="submit" fullWidth>{status}</Button>
                </form>
            </Box>
        </Modal>
    </>);
}
export default LoginPage;
