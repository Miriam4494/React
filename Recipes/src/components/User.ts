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
    switch (action.type) {
        case 'CREATE':            
            return {
                ...state, email: action.data.email, password: action.data.password, id: action.data.id
            }
        case 'UPDATE':
            return {
                ...state, ...action.data
            };
        case 'LOGIN':
            return {
                ...state, ...action.data
            };
        default: return state;
    }
}


