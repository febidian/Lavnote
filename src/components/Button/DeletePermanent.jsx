import React, { useState } from "react";
import LoadingButton from "../LoadingButton";
import Delete from "../../assets/svg/Delete";
import { toast } from "react-hot-toast";
import axiosClient from "../../../axiosClient";
import { useDeletePermanent } from "../../context/DeletePermanentContext";

export default function DeletePermanent({ note_id }) {
  const [isLoading, setLoading] = useState(false);
  const { notes, setNotes } = useDeletePermanent();

  const clickDeleteHandler = async () => {
    setLoading(true);
    try {
      let response = await axiosClient.delete(
        `/notes/delete/permanent/id/${note_id}`
      );
      if (response.status == 200) {
        setNotes(notes.filter((i) => i.note_id !== note_id));
        toast.success(response.data.message);
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
        onClick={() => clickDeleteHandler()}
        className="group rounded-full p-2 border border-slate-300 hover:bg-yellow-200/70 hover:dark:bg-slate-700 transition duration-300"
      >
        {isLoading ? <LoadingButton /> : <Delete />}
      </button>
    </>
  );
}
