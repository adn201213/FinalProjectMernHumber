import axios from 'axios'
import { url } from './backendURL'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
} from '../constants/productConstants'



export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`${url}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const detailsProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`${url}/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const createReviewProduct = (id, review) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_REVIEW_CREATE_REQUEST
    })

    try {
        const { userLogin } = getState()
        const { userInfo } = userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`${url}/api/products/${id}/reviews`, review, config)

        dispatch({ type: PRODUCT_REVIEW_CREATE_SUCCESS })

    } catch (error) {
        dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}