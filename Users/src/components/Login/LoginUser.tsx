import axios from "axios"
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { style } from "../User";
import UserNameAndAvatar from './UserNameAndAvatar'
import { userContext } from "../../App";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const LoginPage = () => {
    const PasswordRef = useRef<HTMLInputElement>(null);
    const EmailRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [status, setStatus] = useState<string>("")
    const [user, userDispatch] = useContext(userContext);

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
            if (e.status === 400 && status == 'register')
                alert('user already sign up 😞');
            if (e.status == 401 && status == 'login')
                alert('user is not register 😞');
        }
        setOpen(false);
    }
    const topStyle = {
        position: 'absolute',
        top: '4%',
        left: '3%'
    }
    return (<>
        <AppBar position="static" style={{ backgroundColor: '#C62828', height: '70px' }}> {/* אדום מעודן */}
            <Toolbar style={{ minHeight: '70px' }}>
                {isLogin ? (
                    <UserNameAndAvatar />
                ) : (
                    ['Sign In', 'Sign Up'].map((text, index) => (
                        <Button
                            key={text}
                            startIcon={index === 0 ? <LoginIcon /> : <PersonAddIcon />}
                            sx={{ margin: 1, color: '#FFFFFF', border: '2px #FFFFFF solid' }}
                            variant="outlined"
                            onClick={() => {
                                setOpen(true);
                                setStatus(index === 0 ? "login" : "register");
                            }}
                        >
                            {text}
                        </Button>)))}
            </Toolbar>
        </AppBar>

        <Modal open={open}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <button style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        padding: '0',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }} onClick={() => setOpen(false)}>X</button>
                    <Typography variant="h5" sx={{ color: '#000000', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>{status}</Typography>
                    {['userEmail', 'userPassword'].map((label) => (
                        <TextField
                            key={label}
                            label={label}
                            variant="filled"
                            margin="normal"
                            type={label === 'userEmail' ? 'email' : 'password'}
                            fullWidth
                            inputRef={label === 'userEmail' ? EmailRef : PasswordRef}
                            InputLabelProps={{ style: { color: '#000000' } }}
                            sx={{
                                '& .MuiFilledInput-root': {
                                    borderBottom: '2px solid #000000',
                                    '&:before, &:hover:before, &:after': { borderBottom: 'none' }
                                }
                            }} />))}
                    <Button color="error" variant="contained" type="submit" fullWidth>{status}</Button>
                </form>
            </Box>
        </Modal>
    </>)
}
export default LoginPage;