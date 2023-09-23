import React, { useState } from "react";
import Star from "../../assets/svg/Star";
import { useNotes } from "../../context/NotesContext";
import axiosClient from "../../../axiosClient";
import { useStar } from "../../context/StarContext";
import LoadingButton from "../LoadingButton";
import { useCategory } from "../../context/CategoryContext";

export default function StarNote({ note_id, isStar }) {
  const { notes, setNotes, isCategory, getNotes } = useNotes();
  const { star, setStar } = useStar();
  const { category, setCategory, setIsActive, getDataCategory } = useCategory();
  const [isLoading, setLoading] = useState(false);

  const clikHandler = async () => {
    setLoading(true);
    try {
      let response = await axiosClient.patch(`/notes/star/id/${note_id}`);
      if (response.status == 200) {
        if (response.data.star == true) {
          setNotes(notes.filter((i) => i.note_id !== note_id));
          setStar((prev) => [{ ...response.data.note }, ...prev]);
          getDataCategory();
          if (notes.length - 1 <= 0) {
            getNotes();
            setIsActive(null);
            localStorage.setItem("category", JSON.stringify(null));
          }
        } else {
          setStar(star.filter((i) => i.notes.note_id !== note_id));
          if (response.data.note.category == null) {
            const filterCategory = category.includes("Unknown");
            filterCategory ? "" : setCategory((prev) => ["Unknown", ...prev]);
          } else {
            const filterCategory = category.includes(
              response.data.note.category
            );
            filterCategory
              ? ""
              : setCategory((prev) => [response.data.note.category, ...prev]);
          }

          if (
            response.data.note.category == isCategory &&
            response.data.note.category != null
          ) {
            setNotes((prev) => [{ ...response.data.note }, ...prev]);
            return;
          } else if (
            isCategory == "Unknown" &&
            response.data.note.category == null
          ) {
            setNotes((prev) => [{ ...response.data.note }, ...prev]);
            return;
          } else if (isCategory == null) {
            setNotes((prev) => [{ ...response.data.note }, ...prev]);
            return;
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
    <div>
      <button
        disabled={isLoading ? true : false}
        onClick={() => clikHandler()}
        className="group rounded-full p-2 border border-slate-300 hover:bg-yellow-200/70 hover:dark:bg-slate-700 transition duration-300"
      >
        {isLoading ? <LoadingButton /> : <Star isStar={isStar} />}
      </button>
    </div>
  );
}
