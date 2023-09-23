import { createContext, useCallback, useContext, useState } from "react";
import axiosClient from "../../axiosClient";

export const DeletePermanentContext = createContext();

export const useDeletePermanent = () => useContext(DeletePermanentContext);

export const DeletePermanentContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingDeletePermanent, setLoading] = useState(true);

  const getShowDestroy = useCallback(async () => {
    if (fetching) {
      return;
    }
    setLoading(true);
    setFetching(true);
    try {
      let response = await axiosClient.get(
        `/notes/delete/show?page=${currentPage}`
      );
      setNotes((prev) => [...response.data.data.data, ...prev]);
      setCurrentPage(response.data.data.meta.current_page + 1);
      if (
        response.data.data.meta.current_page ==
        response.data.data.meta.last_page
      ) {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
      setLoading(false);
    }
  }, [notes, fetching, currentPage, hasMore]);

  const getShowDestroyPage = useCallback(async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    try {
      let response = await axiosClient.get(
        `/notes/delete/show?page=${currentPage}`
      );
      setNotes((prev) => [...response.data.data.data, ...prev]);
      setCurrentPage(response.data.data.meta.current_page + 1);
      if (
        response.data.data.meta.current_page ==
        response.data.data.meta.last_page
      ) {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  }, [notes, fetching, currentPage, hasMore]);
  return (
    <DeletePermanentContext.Provider
      value={{
        notes,
        setNotes,
        hasMore,
        isLoadingDeletePermanent,
        getShowDestroy,
        getShowDestroyPage,
      }}
    >
      {children}
    </DeletePermanentContext.Provider>
  );
};
