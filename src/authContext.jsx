import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const checkToken = async (dispatch, token, role) => {
  try {
    const isValid = await sdk.check(role, token);
    if (!isValid) {
      tokenExpireError(dispatch, "TOKEN_EXPIRED");
    }
  } catch (error) {
    console.error("An error occurred while checking token:", error);
    tokenExpireError(dispatch, "TOKEN_EXPIRED");
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    if (token && user && role && isAuthenticated) {
      dispatch({
        type: "LOGIN",
        payload: {
          token,
          user,
          role,
        },
      });
      // checkToken(dispatch, token, role);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
