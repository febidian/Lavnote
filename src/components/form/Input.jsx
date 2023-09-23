import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <>
      <input
        ref={ref}
        {...props}
        className="mt-3 w-full rounded-md text-slate-800 px-3 md:h-11 sm:h-14 h-14 text-[15px] border-[1px] border-slate-400 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-300 transition duration-200 dark:text-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:placeholder:text-slate-400"
        autoComplete="off"
      />
    </>
  );
});

export default Input;
