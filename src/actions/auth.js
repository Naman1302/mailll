import axios from "axios";
//import Router from "next/router";
import { toast } from "react-toastify";


//Login
export const login = ({ email, password }, callback = ()=>{}) => async (dispatch) => {
  dispatch({type: "AUTH_LOADING"});
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/login", body, config);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
    toast.success("Login Success", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    callback();
  } catch (err) {
    toast.error("Login Failed", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((error) => {
        // ToastsStore.error(error.msg)
      });
    }

    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};


//Register User
export const register = (data) => async (dispatch) => {
  dispatch({type: "AUTH_LOADING"});
  try {
    const res = await axios.post("/register", data);
    console.log(res)

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });
    toast.success("User Added", {
      position: "bottom-center",
      autoClose:2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    toast.success("Mail Sent", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

    // dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: "REGISTER_FAIL"
    });
    toast.error("Register Failed", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};


//Login User WITH google
export const loginByGoogle = (data) => async (
    dispatch
  ) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const email=data.email;
    const token=data.token;
    const body = JSON.stringify({ email, token });
    console.log(body);
  
    try {
      const res = await axios.post("/googleLogin", body, config);
  
      dispatch({
        type: "LOGIN_SUCCESS_BY_GOOGLE",
        payload: res.data,
      });
  
      //Router.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.map((error) => {
          // ToastsStore.error(error.msg)
        });
      }
  
      console.log(errors);
  
      dispatch({
        type: "REGISTER_FAIL",
      });
    }
  };

  export const logout = () => (dispatch) => {
    dispatch({ type: "LOADING/TOGGLE"});
    dispatch({
      type: "LOGOUT",
    });
    toast.info("Logged out!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };


export const editUser = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({type: "AUTH_LOADING"});
    const res = await axios.put("/api/auth", body, config);
    console.log(res);
    dispatch({
      type: "USER_EDITED",
      payload: res.data,
    });
    toast.success("USER EDITED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(getUsers());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "USER_EDITING_FAILED",
    });
    toast.error("USER EDITING Failed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const deleteUser = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch({type: "AUTH_LOADING"});
    const res = await axios.post("/api/auth/delete", body, config);
    console.log(res);
    dispatch({
      type: "USER_DELETED",
      payload: res.data,
    });
    toast.success("USER DELETED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(getUsers());
    //Router.push('/user_management/user')
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "USER_DELETING_FAILED",
    });
    toast.error("USER DELETING Failed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};


export const setSelectedUser = (data) => async (dispatch) => {
  dispatch({
    type: "SET_USER_DATA",
    payload: data,
  });
};

export const getUsers = () => async (dispatch) => {
  //dispatch(setLoading());
  try {
    const res = await axios.get("/api/auth/getUsers");
    console.log(res.data)
    dispatch({
      type: "USERS_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "USERS_LOADING_FAILED",
    });
  }
};


//Login User


//sendForgotPassReq of Account
export const sendForgotPassReq = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/forgot_request", data);
    console.log(res);
    if (res.data.successMsg) {
      dispatch({
        type: "FORGOT_PASS_MAIL_SENT",
      });
      toast.success("Mail Sent", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Mail Sent Failed", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Set Password of Account
export const setPassword = (data) => async (dispatch) => {
  try {
    dispatch({type: "AUTH_LOADING"});
    const res = await axios.post("/api/auth/set_password", data);
    toast.success("Password Successfully Changed", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch({type: "UNDO_LOADING"});
    //Router.push("/");
  } catch (error) {
    console.log(error.message);
  }
};

//Logout User

