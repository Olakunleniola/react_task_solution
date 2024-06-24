import React, { useReducer, useContext } from "react";
import MkdSDK from "./utils/MkdSDK";
import { GlobalContext, showToast } from "./globalContext";


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

export const tokenExpireError = (role, dispatch, errorMessage) => {
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({type: "LOGOUT",});
    window.location.href = `/${role}/login`;
  }
};

const checkToken = async (dispatch, token, role) => {
  try {
    const isValid = await sdk.check(role, token);
    if (!isValid) {
      tokenExpireError(role, dispatch, "TOKEN_EXPIRED");
    }
    return isValid
  } catch (error) {
    console.error("An error occurred while checking token:", error);
    tokenExpireError(role, dispatch, "TOKEN_EXPIRED");
    return false
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {dispatch:globalDispatch} = useContext(GlobalContext)

  React.useEffect(() => {
    //TODO
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");
    
    if (token && user && role) {  
      (async () => {
        const tokenValid = await checkToken(dispatch, token, role);
        if (tokenValid) {
          dispatch({
            type: "LOGIN",
            payload: {
              token,
              user,
              role,
            },
          });
        } else {
          showToast(globalDispatch, "Your Token is Expired");
        }
      })();
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
