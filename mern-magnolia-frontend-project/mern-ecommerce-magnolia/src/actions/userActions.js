import axios from 'axios'
import { url } from './backendURL';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS
} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    })

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${url}/api/users/login`, { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}