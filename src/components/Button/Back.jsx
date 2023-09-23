import React from "react";
import Back from "../../assets/svg/Back";
import { useNavigate } from "react-router-dom";

export default function BackNote() {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="group rounded-full p-2 border border-slate-300 hover:bg-yellow-200/70 hover:dark:bg-slate-700  transition duration-200"
      >
        <Back />
      </button>
    </>
  );
}
