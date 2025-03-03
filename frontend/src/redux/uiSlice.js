// Action Types
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const SET_SIDEBAR_STATE = 'SET_SIDEBAR_STATE';

// Action Creators
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const setSidebarState = (isOpen) => ({
  type: SET_SIDEBAR_STATE,
  payload: isOpen,
});

// Initial State
const initialState = {
  isSidebarOpen: true,
};

// Reducer
const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case SET_SIDEBAR_STATE:
      return {
        ...state,
        isSidebarOpen: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
