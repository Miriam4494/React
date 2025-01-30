import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import React, { FormEvent, useRef, useState } from "react"
import { userContext } from "../../App"
import { style } from "../User"
import axios from "axios"
import UpdateIcon from '@mui/icons-material/Update';
const UpdateUser = () => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [user, userDispatch] = React.useContext(userContext);

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
        } catch (e:any) {
            if (e.status === 404)
                alert('user dont found😞');
        }
    }
    type UserKeys = 'firstName' | 'lastName' | 'password' | 'email' | 'address' | 'phone';

    return (<>
        {!open && <Button startIcon={<UpdateIcon />} sx={{ margin: 1, color: '#FFFFFF', border: '2px #FFFFFF solid' }} variant="outlined" onClick={() => setOpen(!open)}>Update</Button>}
        <Modal open={open} onClose={() => setOpen(false)}>
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
                    }} type="button" onClick={() => setOpen(false)}>X</button>
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
                            }} />
                    ))}
                    <Button color="error" variant="contained" type="submit" fullWidth>Update</Button>
                </form>
            </Box>
        </Modal>
    </>)
}
export default UpdateUser
