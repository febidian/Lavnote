import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Warning() {
  const { NullWithTrashed } = useAuth();

  function DismissHandler() {
    localStorage.setItem("withTrashed", false);
    NullWithTrashed();
  }
  return (
    <>
      <div className="h-12 lg:h-10 xl:h-8 px-3 bg-yellow-200 dark:bg-slate-700 w-full hidden md:flex items-center justify-center text-slate-600 dark:text-slate-200 text-sm ">
        <span className="pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </span>{" "}
        <span className="">
          We would like to inform you that the note will remain in a temporarily
          deleted status for 7 days before being permanently removed.{" "}
          <span className="space-x-2">
            <span>
              <Link
                to={"/notes/showdestroy"}
                className="inline-flex items-center text-slate-800 dark:text-slate-100"
              >
                <span>View</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </Link>
            </span>
            <span>or</span>
            <span>
              <button
                onClick={() => DismissHandler()}
                className="underline text-slate-800 dark:text-slate-100"
              >
                Dismiss
              </button>
            </span>
          </span>
        </span>
      </div>
    </>
  );
}
