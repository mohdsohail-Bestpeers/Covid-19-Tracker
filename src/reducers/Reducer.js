import {FETCH_API_REQUEST,FETCH_API_SUCCESS,FETCH_API_FAILURE,SEARCH_FILTER, FETCH_COUNTRY_API} from "../actions/types"

const intialState = {
    loading: false,
    summary: {},
    error: '',
    filterCountry : [],     //for search filter
    history: []  //for secound page
}

const Reducer = (state=intialState, action) => {
    switch(action.type){
        case FETCH_API_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_API_SUCCESS:
            return {
                ...state,
                loading: false,
                summary: action.payload,
                error: '',
                filterCountry: action.payload.Countries
            }

        case FETCH_API_FAILURE:
            return {
                loading: false,
                summary: {},
                error: action.payload
            }
          
        case SEARCH_FILTER:
            const value = action.payload.toLowerCase()
            const Countries = state.summary.Countries.filter(country =>
                country.Country.toLowerCase().includes(value)
        );
        return {
            ...state,
            loading: false,
            filterCountry: Countries,
            error: ''
        };

        case FETCH_COUNTRY_API:
            return {
                ...state,
                loading: false,
                history: action.payload,
                error: ''
            }

        default: return state;
    }
}

export default Reducer;
