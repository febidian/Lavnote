import { createContext, useContext, useState } from "react";
import axiosClient from "../../axiosClient";

export const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryContextProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [isActive, setIsActive] = useState(
    JSON.parse(localStorage.getItem("category"))
  );
  const [isLoadingCategory, setLoading] = useState(false);
  const getDataCategory = async () => {
    setLoading(true);
    try {
      let response = await axiosClient.get("/notes/menu/category");
      setCategory(response.data.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        getDataCategory,
        setIsActive,
        isActive,
        isLoadingCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
