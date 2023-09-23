import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import parse, { attributesToProps } from "html-react-parser";
import { Link } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";
import DeleteNote from "../../components/Button/Delete";
import ShareNote from "../../components/Button/Share";
import StarNote from "../../components/Button/Star";
import LoadingNotes from "../animateloading/LoadingNotes";
import Ellipsis from "../../assets/svg/Ellipsis";
import { useState } from "react";
import ListTools from "../ListTools";

export default function Shownotes() {
  const { notes, getNotesPage, hasMore, isLoadingNotes } = useNotes();
  const loadMoreHandler = () => {
    getNotesPage();
  };

  return (
    <>
      {isLoadingNotes ? (
        <LoadingNotes />
      ) : notes.length >= 1 ? (
        <InfiniteScroll
          loadMore={loadMoreHandler}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center mt-10" key={0}>
              <svg
                width={40}
                height={40}
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    x1="8.042%"
                    y1="0%"
                    x2="65.682%"
                    y2="23.865%"
                    id="a"
                  >
                    <stop stopColor="#50e0d4" stopOpacity={0} offset="0%" />
                    <stop
                      stopColor="#50e0d4"
                      stopOpacity=".631"
                      offset="63.146%"
                    />
                    <stop stopColor="#50e0d4" offset="100%" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)">
                    <path
                      d="M36 18c0-9.94-8.06-18-18-18"
                      id="Oval-2"
                      stroke="url(#a)"
                      strokeWidth={2}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <circle fill="#fff" cx={36} cy={18} r={1}>
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </g>
              </svg>
            </div>
          }
        >
          <div className="w-full lg:columns-4 md:columns-3 columns-2 md:gap-3 md:space-y-3 gap-2 space-y-2 mt-4">
            {notes.map((note, index) => {
              return (
                <div
                  key={index}
                  className="bg-slate-50 overflow-hidden rounded-3xl border-2 border-yellow-200 dark:border-blue-600 dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-yellow-50 hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="md:px-4 px-3 pt-4 pb-3">
                    <div
                      className={`${
                        note.images_count > 0 ? "max-h-96" : "max-h-96"
                      } min-h-[7rem] overflow-hidden mb-2`}
                    >
                      {note.category ? (
                        <div className="flex justify-end">
                          <div className="border border-yellow-200 dark:border-blue-600  dark:text-slate-100 inline-block max-w-[7rem]  rounded-3xl py-1 px-2 text-[11px] truncate capitalize">
                            {note.category}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div>
                        <Link
                          to={`/note/${note.note_id}`}
                          className="inline-block"
                        >
                          <h1 className="truncate-line sm:text-lg text-base text-slate-700 hover:text-slate-800  dark:text-slate-200 max-h-[83px] font-semibold transition duration-200 capitalize ">
                            {note.title}
                          </h1>
                        </Link>
                      </div>
                      <div
                        className={`${
                          note.images_count > 0
                            ? "truncate-line-star-image text-slate-700"
                            : "truncate-line-star text-slate-700"
                        } text-sm  dark:text-slate-100 mt-1 leading-relaxed  prose prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200 dark:prose-strong:text-slate-100 prose-a:text-blue-600  prose-a:font-medium prose-p:mb-1 prose-p:mt-1 prose-h1:text-xl prose-h1:mt-1 prose-h1:mb-2 prose-h2:text-lg prose-h2:mt-1 prose-h2:mb-2`}
                      >
                        {parse(note.note_content, {
                          replace: (domNode) => {
                            if (domNode.attribs && domNode.name === "script") {
                              const props = attributesToProps(domNode.attribs);
                              return <div {...props} />;
                            }
                            if (domNode.attribs && domNode.name === "br") {
                              const props = attributesToProps(domNode.attribs);
                              return <span {...props} />;
                            }
                          },
                        })}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-1">
                      {note.images_count > 0
                        ? note.images.map((image, index) => {
                            return (
                              <div
                                className="relative w-20 h-20 rounded-lg bg-slate-200 overflow-hidden [&:nth-child(3)]:from-slate-900"
                                key={index}
                              >
                                <img
                                  className="absolute z-10 object-cover object-center w-full h-full "
                                  src={image.thumbail}
                                />
                                {index == 2 && (
                                  <div className="absolute z-50 h-20 w-full bg-slate-600/70 flex items-center justify-center">
                                    <span className="sm:text-3xl text-2xl font-bold text-slate-100">
                                      {note.images_count - 2}+
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  {/*  */}
                  <ListTools
                    created_at={note.created_at}
                    note_id={note.note_id}
                    isStar={note.star}
                    title={note.title}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="flex justify-center text-center py-44">
          <div className="text-6xl text-yellow-200/70">No Notes</div>
        </div>
      )}
    </>
  );
}
