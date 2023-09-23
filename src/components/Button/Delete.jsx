import React, { useState } from "react";
import Delete from "../../assets/svg/Delete";
import axiosClient from "../../../axiosClient";
import { useNotes } from "../../context/NotesContext";
import { toast } from "react-hot-toast";
import LoadingButton from "../LoadingButton";
import { useCategory } from "../../context/CategoryContext";
import { useStar } from "../../context/StarContext";

export default function DeleteNote({ note_id, isStar }) {
  const { notes, setNotes, getNotes } = useNotes();
  const [isLoading, setLoading] = useState(false);
  const { getDataCategory, setIsActive } = useCategory();
  const { star, setStar } = useStar();

  const clikHandler = async () => {
    setLoading(true);
    try {
      if (isStar) {
        let response = await axiosClient.delete(`/notes/delete/id/${note_id}`);
        if (response.status == 200) {
          setStar(star.filter((i) => i.notes.note_id !== note_id));
          getDataCategory();
          toast.success(response.data.message);
        }
      } else {
        let response = await axiosClient.delete(`/notes/delete/id/${note_id}`);
        if (response.status == 200) {
          setNotes(notes.filter((i) => i.note_id !== note_id));
          getDataCategory();
          toast.success(response.data.message);
          if (notes.length - 1 <= 0) {
            getNotes();
            setIsActive(null);
            localStorage.setItem("category", JSON.stringify(null));
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <button
        disabled={isLoading ? true : false}
        onClick={() => clikHandler()}
        className="group rounded-full p-2 border border-slate-300 hover:bg-yellow-200/70 hover:dark:bg-slate-700 transition duration-200"
      >
        {isLoading ? <LoadingButton /> : <Delete />}
      </button>
    </>
  );
}
