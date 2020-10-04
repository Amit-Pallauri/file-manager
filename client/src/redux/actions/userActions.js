import {
    REGISTER_USER,
    UPLOAD_FILE,
    LOGIN_USER,
    LOGOUT_USER,
    GET_USER,
    GET_ALL_USERS,
    GET_UNVERIFIED_ADMINS,
    GET_PARTICULAR_USERS,
    VERIFY_ADMINS,
    LOADER 
} from '../actionTypes/userActionTypes';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../config'
import { notification } from 'antd';


export const registerUser = (user, history) => async dispatch =>  {
    try {
        dispatch({ type : LOADER, payload : true})
        const headers = {
            'Content-Type': 'application/json'
          }
        const { data } = await axios.post(`${SERVER_BASE_URL}/signUp`, user, {headers: headers})
        dispatch({
            type: REGISTER_USER,
            payload: data
        })
        if( data.status == 'success' ){
            dispatch({ type : LOADER, payload : false})
            history.push('/')
            notification.success({
                message : data.message,
                className : "notification"
            })
        }
    } catch (err) {
        console.log(err)
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const loginUser = (user, history) => async (dispatch) =>  {
    try {
        dispatch({ type : LOADER, payload : true})
        const headers = {
            'Content-Type': 'application/json'
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/signIn`, user, {headers: headers});
        dispatch({
            type: LOGIN_USER,
            payload: data
        })
        if( data.status == 'success' ){
            dispatch({ type : LOADER, payload : false})
            history.push('/')
            notification.success({
                message : data.message,
                className : "notification"
            })
        }
    } catch (err) {
        console.log(err)
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const logoutUser = (history)  => async dispatch => {
    try {
        dispatch({ type : LOADER, payload : true})
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : userToken
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/signOut`, { headers : headers })
        dispatch({
            type : LOGOUT_USER
        })
        if( data.status == 'success' ){
            dispatch({ type : LOADER, payload : false})
            notification.success({
                message : data.message,
                className : "notification"
            })
            history.push('/signIn')
        }
    } catch (err) {
        console.log(err)
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const uploadFiles = formdata => async (dispatch) => {
    try {
        dispatch({ type : LOADER, payload : true})
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'multipart/form-data',
            'authorization' : userToken
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/uploadFile`, formdata, { headers : headers })
        dispatch({
            type : UPLOAD_FILE,
            payload : data
        })
        if( data.status == 'success' ){
            dispatch({ type : LOADER, payload : false})
            notification.success({
                message : data.message,
                className : "notification"
            })
        }
    } catch (err) {
        console.log(err)
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const getUser = () => async dispatch => {
    try{
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : userToken
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/getUser`, { headers : headers })
        dispatch({
            type : GET_USER,
            payload : data
        })
    }catch(err){
        console.log(err)
        localStorage.clear()
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const getAllUsers = () => async dispatch => {
    try {
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : userToken
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/getAllFiles`, { headers : headers })
        dispatch({
            type : GET_ALL_USERS,
            payload : data
        })
    } catch (err) {
        console.log(err)
        localStorage.clear()
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const getParticularUser = userId => async dispatch => {
    try {
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : userToken
        }
        const { data } = await axios({
            method : 'GET',
            baseURL : `${SERVER_BASE_URL}/getParticularUser/${userId}`,
            headers : headers
        })
        dispatch({
            type : GET_PARTICULAR_USERS,
            payload : data
        })
    } catch (err) {
        console.log(err)
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const getAllUnverifiedAdmins = () => async dispatch => {
    try {
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : userToken
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/admin/unVerified`, { headers : headers })
        dispatch({
            type : GET_UNVERIFIED_ADMINS,
            payload : data
        })
    } catch (err) {
        console.log(err)
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}

export const verifyAdmins = (verificationStatus, userId) => async dispatch => {
    try {
        const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : userToken,
            'verify' : verificationStatus
        }
        const { data } = await axios({
            method : 'POST',
            baseURL : `${SERVER_BASE_URL}/admin/verifyAdmin/${userId}`,
            headers : headers
        })
        dispatch({
            type : VERIFY_ADMINS,
            payload : data
        })
        if(data.status = 'success'){
            notification.success({
                message : data.message,
                className : "notification"
            })        
        }
        
    } catch (err) {
        console.log(err)
        notification.warning({
            message : err.response.data.message,
            className : "notification"
        })
    }
}