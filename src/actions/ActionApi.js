import moment from 'moment'

import {FETCH_API_REQUEST,FETCH_API_SUCCESS,FETCH_API_FAILURE, SEARCH_FILTER, FETCH_COUNTRY_API} from "./types"
import axios from "axios"

export const fetchApiRequest = () => ({
    type: FETCH_API_REQUEST,
})

export const fetchApiSuceess = (summary) => ({
    type: FETCH_API_SUCCESS,
    payload: summary
})

export const fetchApiFailure = (error) => ({
    type: FETCH_API_FAILURE,
    payload: error
})

export const fetchSummary = () => {
   
    return (dispatch) => {
        dispatch(fetchApiRequest);
        axios.get('https://api.covid19api.com/summary')
        .then( response => {
            const summary = response.data
            dispatch(fetchApiSuceess(summary))
           
        })
        .catch( error => {
            const errorMsg = error.message
            dispatch(fetchApiFailure(errorMsg))
        })
    }
}

export const searchfilter = (searchCountry) =>({
    type : SEARCH_FILTER,
    payload : searchCountry
})

//This function is for secound page api
export const  fetchCountryApi = (data) => ({
    type : FETCH_COUNTRY_API,
    payload: data
})

export const fetchcountry = (id) => {
    const lastmonth_date = moment().subtract(30, 'days').calendar();
    const today_date = moment().format('MM/DD/YYYY')
    return(dispatch) => {
        dispatch(fetchApiRequest);
        axios.get('https://api.covid19api.com/country/'+id+'/status/confirmed?from='+lastmonth_date+'&to='+today_date)
        .then(response => {
            const data = response.data
            dispatch(fetchCountryApi(data))
        })
        .catch(error => {
            const errorMsg = error.message
            dispatch(fetchApiFailure(errorMsg))
        })
    }
}