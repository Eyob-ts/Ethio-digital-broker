// Action Types
export const SET_LISTING = 'SET_LISTING';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

// Action Creators
export const setListing = (listing) => ({
  type: SET_LISTING,
  payload: listing,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

// Initial State
const initialState = {
  listing: {},
  loading: false,
  error: "",
};

// Reducer
const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LISTING:
      return {
        ...state,
        listing: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listingReducer;
