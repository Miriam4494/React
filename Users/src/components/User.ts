export type UserType = {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    address?: string,
    phone?: string,
}
export type action = {
    type: 'DELETE' | 'CREATE' | 'UPDATE' | 'LOGIN',
    data: Partial<UserType>
}
export const User = (state: UserType, action: action): UserType => {
    console.log(action.data);
    console.log(action.type);

    switch (action.type) {

        case 'CREATE':
            return {
                ...state, email: action.data.email, password: action.data.password, id: action.data.id
            }
        case 'UPDATE' :
            return {
                ...state, ...action.data
            };
            case 'LOGIN':
            return {
                ...state, ...action.data
            };
        // case 'DELETE':
        default: return state;
    }
}
export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    pt: 2,
    px: 4,
    pb: 3,
};
export const styleBox = {
    fontSize: '20px',
    fontWeight: 'bold',
    p: 5,
    border: '2px dashed black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}
