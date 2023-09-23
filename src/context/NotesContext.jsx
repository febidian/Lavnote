import { createContext, useCallback, useContext, useState } from "react";
import axiosClient from "../../axiosClient";

export const NotesContext = createContext();

export const useNotes = () => {
  return useContext(NotesContext);
};

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [isLoadingNotes, setLoading] = useState(true);
  const [isCategory, setCategory] = useState(
    JSON.parse(localStorage.getItem("category"))
  );

  const getNotesPage = useCallback(async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    try {
      if (isCategory) {
        let response = await axiosClient.get(
          `/notes/category/${isCategory}?page=${currentPage}`
        );
        setNotes((prev) => [...prev, ...response.data.notes.data]);
        setCurrentPage(response.data.notes.meta.current_page + 1);
        if (
          response.data.notes.meta.current_page ==
          response.data.notes.meta.last_page
        ) {
          sethasMore(false);
        }
      } else {
        let response = await axiosClient.get(
          `/notes/category?page=${currentPage}`
        );

        setNotes((prev) => [...prev, ...response.data.notes.data]);
        setCurrentPage(response.data.notes.current_page + 1);
        if (response.data.notes.current_page == response.data.notes.last_page) {
          sethasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  }, [notes, fetching, currentPage, hasMore, isCategory]);

  const getNotes = async (NameCatagory = null) => {
    setLoading(true);
    try {
      if (NameCatagory) {
        let response = await axiosClient.get(
          `/notes/category/${NameCatagory}?page=1`
        );
        setNotes(response.data.notes.data);
        sethasMore(true);
        setCurrentPage(response.data.notes.meta.current_page + 1);
        if (
          response.data.notes.meta.current_page ==
          response.data.notes.meta.last_page
        ) {
          sethasMore(false);
        }
      } else {
        let response = await axiosClient.get(`/notes/category?page=1`);
        setNotes(response.data.notes.data);
        sethasMore(true);
        setCurrentPage(response.data.notes.meta.current_page + 1);
        if (
          response.data.notes.meta.current_page ==
          response.data.notes.meta.last_page
        ) {
          sethasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
      setLoading(false);
    }
  };

  const getsetCategory = (NameCategory) => setCategory(NameCategory);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        hasMore,
        getNotesPage,
        getNotes,
        getsetCategory,
        isCategory,
        isLoadingNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
