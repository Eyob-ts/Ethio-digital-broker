// Action Types
export const LOGIN = 'auth/login';
export const LOGOUT = 'auth/logout';
export const UPDATE_USER = 'auth/updateUser';

const initialState = {
  isLoggedIn: !!localStorage.getItem("authToken"),
  user: JSON.parse(localStorage.getItem("user")) || null,
};

// Action Creators
export const login = (userData) => {
  localStorage.setItem("authToken", userData.token);
  localStorage.setItem("user", JSON.stringify(userData));
  return {
    type: LOGIN,
    payload: userData
  };
};

export const logout = () => {
  // Clear local storage
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  
  // Return action
  return {
    type: LOGOUT
  };
};

export const updateUser = (userData) => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const updatedUser = { ...currentUser, ...userData };
  localStorage.setItem("user", JSON.stringify(updatedUser));
  return {
    type: UPDATE_USER,
    payload: userData
  };
};

// Reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };
    case LOGOUT:
      // Ensure we clear everything
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      return {
        ...state,
        isLoggedIn: false,
        user: null
      };
    case UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
}
