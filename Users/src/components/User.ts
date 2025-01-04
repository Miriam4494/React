export type UserType = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    address?: string,
    phone?: string,
}
export type action = {
    type: 'DELETE' | 'CREATE' | 'UPDATE',
    data: Partial<UserType>
}
export const User = (state: UserType, action: action): UserType => {
    switch (action.type) {
        case 'CREATE':
            return {
                ...state, firstName: action.data.firstName,password: action.data.password
            }
        case 'UPDATE':
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