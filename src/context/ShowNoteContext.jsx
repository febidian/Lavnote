import { createContext, useContext, useState } from "react";
import axiosClient from "../../axiosClient";

export const ShowNoteContext = createContext();

export const useShowNote = () => useContext(ShowNoteContext);

export const ShowNoteContextProvider = ({ children }) => {
  const [showNote, setShowNote] = useState([]);
  const [isLoadingNote, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const getNote = async (note_id) => {
    try {
      let response = await axiosClient.get(`/notes/show/id/${note_id}`);
      setShowNote(response.data.note);
    } catch (error) {
      if (error.response.status == 403) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <ShowNoteContext.Provider
      value={{ showNote, isLoadingNote, getNote, isError }}
    >
      {children}
    </ShowNoteContext.Provider>
  );
};
