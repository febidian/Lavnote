import React from "react";
import { useStar } from "../../context/StarContext";
import { Link } from "react-router-dom";
import StarNote from "../Button/Star";
import ShareNote from "../Button/Share";
import DeleteNote from "../Button/Delete";
import parse, { attributesToProps } from "html-react-parser";
import LoadingStar from "../animateloading/LoadingStar";
import ListTools from "../ListTools";

export default function Showstar() {
  const { star, isLoadingStar } = useStar();

  return (
    <>
      <div className="xl:mx-20 md:mx-12 mx-4 pt-10 pb-14 scroll-smooth">
        <div className="text-4xl text-slate-600 dark:text-slate-300 font-semibold">
          Pinned
        </div>
        {isLoadingStar ? (
          <LoadingStar />
        ) : star.length >= 1 ? (
          <div className="w-full lg:columns-4 md:columns-3 columns-2 md:gap-3 md:space-y-3 gap-2 space-y-2 mt-4">
            {star.map((s, index) => {
              return (
                <div
                  key={index}
                  className="bg-slate-50 overflow-hidden rounded-3xl border-2 border-yellow-200 dark:border-blue-600 dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-yellow-50 hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="px-4 pt-4 pb-3">
                    <div className="min-h-[7rem] max-h-[17rem] overflow-hidden">
                      {s.notes.category ? (
                        <div className="flex justify-end">
                          <div className="border border-yellow-200 dark:border-blue-600 dark:text-slate-100 inline-block max-w-[7rem]  rounded-3xl py-1 px-2 text-[11px] truncate capitalize">
                            {s.notes.category}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div>
                        <Link to={`/note/${s.notes.note_id}`}>
                          <h1 className="truncate-line text-lg text-slate-700 hover:text-slate-800  dark:text-slate-200 max-h-[83px] font-semibold transition duration-200 capitalize">
                            {s.notes.title}
                          </h1>
                        </Link>
                      </div>
                      <div
                        className={`${
                          s.notes.images_count > 0
                            ? "truncate-line-star-image text-slate-700"
                            : "truncate-line-star text-slate-700"
                        } text-sm  dark:text-slate-100 mt-1 leading-relaxed  prose prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200 dark:prose-strong:text-slate-100 prose-a:text-blue-600  prose-a:font-medium prose-p:mb-1 prose-p:mt-1 prose-h1:text-xl prose-h1:mt-1 prose-h1:mb-2 prose-h2:text-lg prose-h2:mt-1 prose-h2:mb-2`}
                      >
                        {parse(s.notes.note_content, {
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
                      {s.notes.images_count > 0
                        ? s.notes.images.map((image, index) => {
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
                                  <div className="absolute z-50 w-full bg-slate-600/70 h-20 flex items-center justify-center">
                                    <span className="sm:text-3xl text-2xl font-bold text-slate-100">
                                      {s.notes.images_count - 2}+
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <ListTools
                    created_at={s.notes.created_at}
                    note_id={s.notes.note_id}
                    title={s.notes.title}
                    isStar={s.star}
                  />
                  {/* <div className="border-t h-14">
                    <div className="px-4 h-full flex justify-between items-center">
                      <div>
                        <div className="text-xs text-slate-500  dark:text-slate-300">
                          Create :
                        </div>
                        <div className="text-sm text-slate-700 dark:text-slate-100 truncate">
                          {s.notes.created_at}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarNote note_id={s.notes.note_id} isStar={s.star} />
                        <ShareNote
                          note_id={s.notes.note_id}
                          title={s.notes.title}
                        />
                        <DeleteNote note_id={s.notes.note_id} isStar={s.star} />
                      </div>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center text-center py-20">
            <div className="text-6xl text-yellow-200/70">No Notes Pinned</div>
          </div>
        )}
      </div>
    </>
  );
}
