import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import React, { FormEvent, useRef, useState } from "react"
import { userCotext } from "./LoginUser"
import { style } from "./User"
import axios from "axios"

const UpdateUser = () => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [user, userDispatch] = React.useContext(userCotext);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setOpen(false)
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
                { headers: { 'user-id':  user.id+''} }
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
            if (e.status === 404)
                alert('user dont found😞');
        }
    }
    return (<>
        {!open && <Button color="primary" variant="outlined" onClick={() => setOpen(!open)}>Update</Button>}

        
        < Modal open={open} >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>Update</Typography>
                    <TextField label='FirstName' variant="filled" defaultValue={user.firstName} margin="normal" fullWidth inputRef={firstNameRef} />
                    <TextField label='LastName' variant="filled" defaultValue={user.lastName} margin="normal" fullWidth inputRef={lastNameRef} />
                    <TextField label='Password' variant="filled" defaultValue={user.password} margin="normal" type="password" fullWidth inputRef={passwordRef} />
                    <TextField label='Email' variant="filled" defaultValue={user.email} margin="normal" type="email" fullWidth inputRef={emailRef} />
                    <TextField label='Address' variant="filled" margin="normal" defaultValue={user.address} fullWidth inputRef={addressRef} />
                    <TextField label='Phone' variant="filled" margin="normal" defaultValue={user.phone} fullWidth inputRef={phoneRef} />
                    <Button color="error" variant="contained" type="submit" fullWidth>Update</Button>
                </form>
            </Box>
        </Modal >
    </>)
}
export default UpdateUser
