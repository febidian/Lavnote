import React from "react";

export default function Label({ title, htmlFor = "" }) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm text-slate-600 font-medium dark:text-slate-200"
      >
        {title}
      </label>
    </>
  );
}
