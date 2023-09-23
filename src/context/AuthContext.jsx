import { useContext, createContext, useReducer } from "react";
import axiosClient from "../../axiosClient";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const initialLoginState = {
  isLoading: false,
  isError: {},
  withTrashed: JSON.parse(localStorage.getItem("withTrashed")) || false,
};

const AuthActions = {
  SET_LOADING: "SET_LOADING",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",
  SET_WITHTRASHED: "SET_WITHTRASHED",
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case AuthActions.SET_LOADING:
      return { ...state, isLoading: true };
    case AuthActions.SET_LOADING_FALSE:
      return { ...state, isLoading: false };
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: {},
        withTrashed: action.payload.withTrashed,
      };
    case AuthActions.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: action.payload.errors,
      };
    case AuthActions.LOGOUT_SUCCESS:
      return { ...state, isLoading: false };
    case AuthActions.LOGOUT_FAILED:
      return { ...state, isLoading: false };
    case AuthActions.SET_WITHTRASHED:
      return {
        ...state,
        withTrashed: false,
      };
    default:
      break;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialLoginState);

  const login = async (email, password) => {
    dispatch({ type: AuthActions.SET_LOADING });
    try {
      let response = await axiosClient.post("/auth/login", {
        email: email,
        password: password,
      });
      if (response.status == 200) {
        let getuser = await axiosClient.get("/me");
        localStorage.setItem("user", JSON.stringify(getuser.data.user));
        localStorage.setItem(
          "withTrashed",
          JSON.stringify(response.data.withTrashed)
        );

        dispatch({
          type: AuthActions.LOGIN_SUCCESS,
          payload: {
            withTrashed: response.data.withTrashed,
          },
        });
        return response;
      }
    } catch (e) {
      if (e.response.status == 422) {
        dispatch({
          type: AuthActions.LOGIN_FAILED,
          payload: {
            errors: e.response.data.errors,
          },
        });
        return e.response;
      }
      if (e.response.status == 401) {
        dispatch({
          type: AuthActions.LOGIN_FAILED,
          payload: {
            errors: e.response.data.errors,
          },
        });
        return e.response;
      }
    } finally {
      dispatch({ type: AuthActions.SET_LOADING_FALSE });
    }
  };

  const logout = async () => {
    dispatch({ type: AuthActions.SET_LOADING });
    try {
      let response = await axiosClient.post("/auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("user");
        localStorage.setItem("category", JSON.stringify(null));
        localStorage.setItem("withTrashed", JSON.stringify(false));
        dispatch({ type: AuthActions.LOGOUT_SUCCESS });
        return response;
      }
    } catch (e) {
      dispatch({ type: AuthActions.LOGOUT_FAILED });
      return e.response;
    } finally {
      dispatch({ type: AuthActions.SET_LOADING_FALSE });
    }
  };

  const NullWithTrashed = () => dispatch({ type: AuthActions.SET_WITHTRASHED });

  return (
    <AuthContext.Provider value={{ ...state, login, logout, NullWithTrashed }}>
      {children}
    </AuthContext.Provider>
  );
};
