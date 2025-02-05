import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";
import { UserContext } from "../../AppProvider";
import { styleBox } from "../Style";
import axios from "axios";
import UpdateIcon from '@mui/icons-material/Update';
import CloseIcon from '@mui/icons-material/Close'; 
import { UserKeys } from "../Types&Interfaces";
import Swal from "sweetalert2";
const UpdateUser = () => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [user, userDispatch] = React.useContext(UserContext);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setOpen(false);
        try {
            const res = await axios.put('http://localhost:3000/api/user',
                {
                    password: passwordRef.current?.value || user.password,
                    firstName: firstNameRef.current?.value || user.firstName,
                    lastName: lastNameRef.current?.value || user.lastName,
                    email: emailRef.current?.value || user.email,
                    address: addressRef.current?.value || user.address,
                    phone: phoneRef.current?.value || user.phone,
                },
                { headers: { 'user-id': user.id + '' } }
            )
            userDispatch({
                type: 'UPDATE',
                data: {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    password: res.data.password,
                    email: res.data.email,
                    address: res.data.address,
                    phone: res.data.phone,
                }
            })
        } catch (e: any) {
            if (e.response?.status === 404)
                Swal.fire({ icon: "error", title: "Oops...", text: "User not found 😞!", footer: 'Please try again' });
        }
    }
    return (<>
            {!open && <Button startIcon={<UpdateIcon />} sx={{ margin: 1, color: '#FFFFFF', border: '2px #FFFFFF solid' }} variant="outlined" onClick={() => setOpen(!open)}>Update</Button>}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={styleBox}>
                    <form onSubmit={handleSubmit}>
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{ position: 'absolute', top: 10, right: 10 }} 
                        >
                            <CloseIcon /> 
                        </IconButton>
                        <Typography variant="h5" sx={{ color: '#000000', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>Update</Typography>
                        {(['firstName', 'lastName', 'password', 'email', 'address', 'phone'] as UserKeys[]).map((label) => (
                            <TextField
                                key={label}
                                label={label.charAt(0).toUpperCase() + label.slice(1)}
                                variant="filled"
                                margin="normal"
                                type={label === 'email' ? 'email' : label === 'password' ? 'password' : 'text'}
                                defaultValue={user[label]}
                                fullWidth
                                inputRef={eval(`${label}Ref`)}
                                InputLabelProps={{ style: { color: '#000000' } }}
                                sx={{
                                    '& .MuiFilledInput-root': { borderBottom: '2px solid #000000', '&:before, &:hover:before, &:after': { borderBottom: 'none' } }
                                }}
                            />
                        ))}
                        <Button color="error" variant="contained" type="submit" fullWidth>Update</Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
export default UpdateUser;
