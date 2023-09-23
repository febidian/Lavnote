import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export const MeContext = createContext();

export const useMe = () => {
  return useContext(MeContext);
};

export const MeContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  const getUser = async () => {
    try {
      let response = await axiosClient.get("/me");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MeContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </MeContext.Provider>
  );
};
