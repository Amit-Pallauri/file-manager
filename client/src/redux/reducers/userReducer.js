import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER, 
    UPLOAD_FILE,
    GET_USER,
    GET_ALL_USERS,
    GET_PARTICULAR_USERS,
    GET_UNVERIFIED_ADMINS,
    VERIFY_ADMINS,
    LOADER 
} from '../actionTypes/userActionTypes';

const initialState = {
    user: '',
    allUsers : '',
    unverifiedAdmins : '',
    particularUser : '',
    loader : false
}

const userReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case REGISTER_USER:
            if(payload.userType == 'user'){
                localStorage.setItem('userType', JSON.stringify(payload.userType))
                localStorage.setItem('token', JSON.stringify(payload.token))
                return {
                    ...state, user : payload.data
                }
            }else{
                localStorage.clear()
                return {
                    ...state, user : payload.data
                }
            }

        case LOGIN_USER:
            localStorage.setItem("token", JSON.stringify(payload.token));
            localStorage.setItem("userType", JSON.stringify(payload.userType))
            return {
                ...state, user: payload.data
            }

        case LOGOUT_USER:
            localStorage.clear();
                return {
                    ...state, user: null
                }

        case UPLOAD_FILE:
            return {
                ... state, user : payload.data
            }

        case GET_USER:
            return { 
                ...state,
                user : payload.data 
            } 

        case GET_ALL_USERS:
            return {
                ...state, allUsers : payload.data 
            }

        case GET_UNVERIFIED_ADMINS:
            return {
                ...state, unverifiedAdmins : payload.data
            }

        case VERIFY_ADMINS:
            return {
                ...state, unverifiedAdmins : payload.data
            }

        case GET_PARTICULAR_USERS:
            return{
                ...state, particularUser : payload.data
            }

        case LOADER:
            return{
                ...state, loader : payload
            }

        default:
            return state;
    }
}

export default userReducer;
