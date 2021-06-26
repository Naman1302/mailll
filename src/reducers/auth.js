const initialState = {
    user: {},
    token: "",
    isAuthenticated: false,
    loading: false,
    selectedUser: {},
  };
  
  export default function auth(state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
      case "LOGIN_SUCCESS":
      case "LOGIN_SUCCESS_BY_GOOGLE": 
        localStorage.setItem("token", payload.token);
        console.log("payload: ", payload);
        return {
          ...state,
          ...payload,
          loading: false,
          isAuthenticated: true,
        };
      case "REGISTER_SUCCESS_BY_GOOGLE":
      case "REGISTER_SUCCESS":
        localStorage.setItem("token", payload.token);
        console.log("payload: ", payload);
        return {
          ...state,
          ...payload,
          loading: false,
          isAuthenticated: true
        };
  
      case "AUTH_ERROR":
      case "LOGIN_FAIL":
      case "REGISTER_FAIL":
      case "LOGOUT":
        localStorage.removeItem("token");
        return {
          ...state,
          token: null,
          loading: false,
          isAuthenticated: false,
          user: null,
        };
      case "USER_LOADED":
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
          laoding: false
        };
      case "USERS_LOADED":
        return {
          ...state,
          isAuthenticated: true,
          laoding: false
        };
      case 'SET_USER_DATA':
        return {
          ...state,
          loading: false,
          selectedUser: payload
        }
      case 'UNDO_LOADING':
        return {
          ...state,
          loading: false,
        }
      case 'AUTH_LOADING':
        return {
          ...state,
          loading: true
        }
      default:
        return state;
    }
  }