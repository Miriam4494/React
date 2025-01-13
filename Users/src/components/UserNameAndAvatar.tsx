
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { userCotext } from './LoginUser';
import { Typography } from '@mui/material';
import UpdateUser from './UpdateUser';

const UserNameAndAvatar = () => {
    const [user, userDispatch] = React.useContext(userCotext);

    function stringToColor(string: string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    function stringAvatar(email: string, name: string) {
        console.log("name");
        console.log(name);

        let x;
        if (name == 'undefined'||name==' ')
            x = `${email.split(' ')[0][0]}`
        else
            x = `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: x
        };
    }

    return (<>
        <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar(user.email || '', user.firstName + (user.lastName !== undefined ? ' ' + user.lastName : ''))} />
            <Typography variant="h5" align="left" >{user.firstName} {user.lastName}</Typography>
            <UpdateUser />
        </Stack>
    </>)



}
export default UserNameAndAvatar