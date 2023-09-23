import React, { useState } from "react";
import Delete from "../../assets/svg/Delete";
import axiosClient from "../../../axiosClient";
import LoadingButton from "../LoadingButton";
import { toast } from "react-hot-toast";
import { useDeletePermanent } from "../../context/DeletePermanentContext";

export default function DeleteAllPermanent() {
  const [isLoading, setLoading] = useState(false);
  const { setNotes } = useDeletePermanent();

  const clikHandler = async () => {
    setLoading(true);
    try {
      let response = await axiosClient.delete(`/notes/delete/all/permanent`);
      console.log(response);
      if (response.status == 200) {
        setNotes([]);
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
        onClick={() => clikHandler()}
        className="inline-flex items-center px-3 dark:text-slate-100 border w-full h-11 rounded-lg border-slate-300 hover:ring-1 hover:ring-red-300 hover:border-slate-500 shadow-sm  disabled:bg-blue-400 disabled:ring-0 disabled:border-0 transition duration-300"
      >
        {isLoading ? <LoadingButton /> : <Delete />}{" "}
        <span className="ml-2">Delete All</span>
      </button>
    </>
  );
}
