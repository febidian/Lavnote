import { createContext, useContext, useState } from "react";
import axiosClient from "../../axiosClient";

export const StarContext = createContext();

export const useStar = () => useContext(StarContext);

export const StarContextProvider = ({ children }) => {
  const [star, setStar] = useState([]);
  const [current_page, setCurrent_page] = useState(1);
  const [moreStar, setMoreStar] = useState(false);
  const [isLoadingStar, setLoadingStar] = useState(true);
  const [isLoadingStarPage, setLoadingStarPage] = useState(true);

  const getStar = async () => {
    setLoadingStar(true);
    try {
      let response = await axiosClient.get(`/notes/star?page=1`);
      setStar(response.data.data.data);
      setCurrent_page(response.data.data.meta.current_page + 1);
      if (
        response.data.data.meta.current_page ==
        response.data.data.meta.last_page
      ) {
        setMoreStar(false);
      } else {
        setMoreStar(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStar(false);
    }
  };

  const getStarPage = async () => {
    setLoadingStarPage(true);
    try {
      let response = await axiosClient.get(`/notes/star?page=${current_page}`);
      console.log(response);
      setStar((prev) => [...prev, ...response.data.data.data]);
      setCurrent_page(response.data.data.meta.current_page + 1);
      if (
        response.data.data.meta.current_page ==
        response.data.data.meta.last_page
      ) {
        setMoreStar(false);
      } else {
        setMoreStar(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStarPage(false);
    }
  };
  return (
    <StarContext.Provider
      value={{
        star,
        setStar,
        getStar,
        moreStar,
        isLoadingStar,
        getStarPage,
        isLoadingStarPage,
      }}
    >
      {children}
    </StarContext.Provider>
  );
};
