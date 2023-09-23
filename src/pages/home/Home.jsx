import React, { useEffect } from "react";
import Shownotes from "../../components/notes/Shownotes";
import { useNotes } from "../../context/NotesContext";
import { useStar } from "../../context/StarContext";
import Showstar from "../../components/notes/Showstar";
import { useCategory } from "../../context/CategoryContext";
import LoadingButton from "../../components/LoadingButton";
import Warning from "../../components/Warning";
import { useAuth } from "../../context/AuthContext";
import LaodingCategory from "../../components/animateloading/LaodingCategory";

export default function Home() {
  const { getNotes, getsetCategory } = useNotes();
  const {
    category,
    getDataCategory,
    isActive,
    setIsActive,
    isLoadingCategory,
  } = useCategory();
  const { getStar, moreStar, isLoadingStar, getStarPage, isLoadingStarPage } =
    useStar();
  const { withTrashed } = useAuth();

  useEffect(() => {
    getDataCategory();
    getStar();
    getNotes(isActive);
  }, []);

  const clikHandler = (NameCategory = null) => {
    getNotes(NameCategory);
    setIsActive(NameCategory);
    getsetCategory(NameCategory);
    localStorage.setItem("category", JSON.stringify(NameCategory));
  };

  const ClickStart = () => {
    getStarPage();
  };

  return (
    <>
      {withTrashed == true && <Warning />}

      <Showstar />
      {moreStar ? (
        <div className="flex justify-center mt-3">
          <button
            disabled={isLoadingStar ? true : false}
            onClick={() => ClickStart()}
            className="inline-flex items-center bg-slate-50 hover:bg-yellow-50 text-slate-600  hover:text-slate-700 hover:border-yellow-300  transition-all duration-300 border border-yellow-200 rounded-3xl px-6 py-[8px] text-center disabled:bg-yellow-100 disabled:border-yellow-400"
          >
            {isLoadingStarPage ? <LoadingButton /> : ""}{" "}
            <span className="ml-2">Load More</span>
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="xl:mx-20 md:mx-12 mx-4 pt-5 pb-14 scroll-smooth">
        <div className="text-4xl text-slate-600 dark:text-slate-300 font-semibold">
          Notes
        </div>
        <div className="mt-6 h-14 flex space-x-2 items-center overflow-x-auto  scrollbar-none lg:scrollbar-thin scrollbar-thumb-yellow-200 dark:scrollbar-thumb-blue-400 scrollbar-track-yellow-100 dark:scrollbar-track-blue-200 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
          <button
            onClick={() => clikHandler()}
            disabled={isActive ? false : true}
            className="bg-slate-50 dark:bg-slate-600  hover:bg-yellow-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-300 border border-yellow-200 dark:border-blue-600 dark:hover:border-blue-700 rounded-3xl px-3 py-[7px] text-center disabled:bg-yellow-100 dark:disabled:bg-slate-800 disabled:border-yellow-400 dark:disabled:border-blue-800"
          >
            <div className="min-w-[3rem] max-w-[10rem] truncate">All</div>
          </button>
          {isLoadingCategory ? (
            <LaodingCategory />
          ) : category.length >= 1 ? (
            category.map((c, i) => {
              return (
                <button
                  key={i}
                  disabled={isActive == c ? true : false}
                  onClick={() => clikHandler(c)}
                  className="bg-slate-50 dark:bg-slate-600  hover:bg-yellow-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-100 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-300 border border-yellow-200 dark:border-blue-600 dark:hover:border-blue-700 rounded-3xl px-3 py-[7px] text-center disabled:bg-yellow-100 dark:disabled:bg-slate-800 disabled:border-yellow-400 dark:disabled:border-blue-800"
                >
                  <div className="min-w-[3rem] max-w-[10rem] truncate capitalize">
                    {c}
                  </div>
                </button>
              );
            })
          ) : (
            ""
          )}
        </div>

        <Shownotes />
      </div>
    </>
  );
}
