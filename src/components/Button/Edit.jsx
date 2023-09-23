import React from "react";
import { Link } from "react-router-dom";
import EditTools from "../../assets/svg/EditTools";

export default function Edit({ note_id }) {
  return (
    <Link
      to={`/note/update/${note_id}`}
      className="group rounded-full p-2 border border-slate-300 hover:bg-yellow-200/70 hover:dark:bg-slate-700  transition duration-200"
    >
      <EditTools />
    </Link>
  );
}
