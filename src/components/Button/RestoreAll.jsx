import React, { useState } from "react";
import LoadingButton from "../LoadingButton";
import Restore from "../../assets/svg/Restore";
import axiosClient from "../../../axiosClient";
import { toast } from "react-hot-toast";
import { useDeletePermanent } from "../../context/DeletePermanentContext";

export default function RestoreAll() {
  const [isLoading, setLoading] = useState(false);
  const { setNotes } = useDeletePermanent();

  const clikHandler = async () => {
    setLoading(true);
    try {
      let response = await axiosClient.get(`/notes/delete/restore`);
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
        className="inline-flex items-center dark:text-slate-100 px-3 border w-full h-11 rounded-lg border-slate-300 hover:ring-1 hover:ring-cyan-300 hover:border-slate-500 shadow-sm  disabled:bg-blue-400 disabled:ring-0 disabled:border-0 transition duration-300"
      >
        {isLoading ? <LoadingButton /> : <Restore />}{" "}
        <span className="ml-2">Restore All</span>
      </button>
    </>
  );
}
