import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse, { attributesToProps } from "html-react-parser";
import StarNote from "../../components/Button/Star";
import ShareNote from "../../components/Button/Share";
import BackNote from "../../components/Button/Back";
import Edit from "../../components/Button/Edit";
import { useShowNote } from "../../context/ShowNoteContext";
import StarShow from "../../components/Button/StarShow";
import { PhotoProvider, PhotoView } from "react-photo-view";

export default function Notes() {
  const { note_id } = useParams();
  const { showNote, getNote, isLoadingNote, isError } = useShowNote();

  useEffect(() => {
    getNote(note_id);
  }, []);
  return (
    <>
      {isError ? (
        <div className="min-h-screen flex flex-col items-center justify-center md:text-6xl text-4xl text-yellow-400 dark:text-slate-700 text-center">
          <span>You do not own this post.</span>
          <Link
            className=" mt-4 md:text-xl text-lg border hover:text-slate-500 dark:hover:text-slate-200  hover:bg-yellow-200 dark:hover:bg-slate-400 transition-all duration-200 border-yellow-400 dark:border-gray-700 rounded-lg md:p-3 p-2"
            to={"/"}
          >
            Back Home
          </Link>
        </div>
      ) : (
        <div className="min-h-screen flex">
          <div className="lg:w-[73%] w-full overflow-y-auto h-screen xl:px-24 lg:px-10 md:px-12 px-3 py-10  flex  justify-center">
            <div className="w-full">
              <div>
                <h1 className="md:text-[2.5rem] sm:text-[2.3rem] text-2xl text-slate-800 dark:text-slate-300 font-semibold md:leading-tight leading-snug capitalize text-center">
                  <span>
                    {isLoadingNote ? (
                      <div className="space-y-3 flex flex-col items-center px-2">
                        <div className="bg-slate-100 w-full h-8 rounded-lg animate-pulse"></div>
                        <div className="bg-slate-100 w-96 h-8 rounded-lg animate-pulse "></div>
                      </div>
                    ) : (
                      showNote.title
                    )}{" "}
                  </span>{" "}
                </h1>
              </div>

              {/* image mobile */}
              <div
                className={`${
                  isLoadingNote
                    ? ""
                    : showNote.images_count > 0
                    ? ""
                    : "flex justify-center items-center lg:hidden "
                }   `}
              >
                {isLoadingNote ? (
                  <div className="w-full grid grid-cols-4 grid-rows-2 gap-2 lg:hidden mt-10">
                    <div className="animate_pulse rounded-md bg-slate-200 overflow-hidden"></div>
                    <div className="animate_pulse rounded-md bg-slate-200 overflow-hidden"></div>
                    <div className="animate_pulse rounded-md bg-slate-200 overflow-hidden"></div>
                    <div className="animate_pulse rounded-md bg-slate-200 overflow-hidden"></div>
                    <div className="animate_pulse rounded-md bg-slate-200 overflow-hidden"></div>
                    <div className="animate_pulse rounded-md bg-slate-200 overflow-hidden"></div>
                  </div>
                ) : showNote.images_count > 0 ? (
                  <div className="w-full grid grid-cols-4 gap-2 lg:hidden mt-10">
                    {showNote.images.map((image) => {
                      return (
                        <div
                          key={image.id}
                          className=" rounded-md bg-slate-200 overflow-hidden"
                        >
                          <PhotoProvider
                            bannerVisible={false}
                            maskOpacity={0.7}
                          >
                            <PhotoView src={image.image}>
                              <img
                                className="object-cover object-center w-full h-full "
                                src={image.thumbail}
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* end image mobile */}
              {/* tools mobile */}
              {isLoadingNote ? (
                ""
              ) : (
                <div className="xl:hidden flex space-x-2 mt-6">
                  <BackNote />
                  <Edit note_id={note_id} />
                  <StarShow
                    isStar={showNote.star.star}
                    note_id={showNote.note_id}
                  />
                  <ShareNote note_id={note_id} />
                </div>
              )}
              {/* end tools mobile */}
              <div className="relative border-2 border-yellow-300 dark:border-blue-600 rounded-2xl pt-3 pb-5 mb-8 px-4 xl:mt-6 mt-3 min-h-[28rem]">
                {isLoadingNote ? (
                  <div className="flex justify-end space-x-2">
                    <div className="border border-yellow-200 dark:border-blue-600 max-w-[7rem]  rounded-3xl py-1 px-2 ">
                      <div className="w-12 h-5 rounded animate-pulse bg-slate-100"></div>
                    </div>
                    <div className="border border-yellow-200 dark:border-blue-600 max-w-[7rem]  rounded-3xl py-1 px-2 ">
                      <div className="w-20 h-5 rounded animate-pulse bg-slate-100"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end space-x-2">
                    {showNote.category && (
                      <div className="border dark:text-slate-200 border-yellow-200 dark:border-blue-600 inline-block max-w-[7rem] rounded-3xl py-1 px-2 text-[11px] truncate capitalize ">
                        {showNote.category}
                      </div>
                    )}
                    <div className="border dark:text-slate-200 border-yellow-200 dark:border-blue-600 inline-block max-w-[7rem]  rounded-3xl py-1 px-2 text-[11px] truncate capitalize">
                      {showNote.created_at}
                    </div>
                  </div>
                )}

                <div className="mt-3 dark:text-slate-200 prose prose-lg  max-w-none prose-h2:mt-6 prose-headings:text-slate-800 dark:prose-headings:text-slate-100 prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-200 prose-h1:text-3xl dark:prose-strong:text-slate-50 prose-h1:font-bold prose-a:text-blue-600  prose-a:font-medium leading-loose">
                  {isLoadingNote ? (
                    <div className="space-y-3">
                      <div className="bg-slate-100 w-full h-8 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-72 h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-52 h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-full h-5 rounded-lg animate-pulse"></div>
                      <div className="bg-slate-100 w-80 h-5 rounded-lg animate-pulse"></div>
                    </div>
                  ) : showNote.note_content ? (
                    parse(showNote.note_content, {
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
                    })
                  ) : (
                    ""
                  )}
                </div>
                {/* tools destop */}
                {isLoadingNote ? (
                  ""
                ) : (
                  <div className="xl:flex hidden absolute top-8 -left-12  flex-col space-y-2">
                    <BackNote />
                    <Edit note_id={note_id} />
                    <StarShow
                      isStar={showNote.star.star}
                      note_id={showNote.note_id}
                    />
                    <ShareNote note_id={note_id} />
                  </div>
                )}
                {/* end tools destop */}
              </div>
              <div className="h-8"></div>
            </div>
          </div>
          {/* image destop */}
          <div
            className={`${
              isLoadingNote
                ? ""
                : showNote.images_count > 0
                ? ""
                : "flex justify-center items-center"
            }  lg:w-[27%] lg:block hidden bg-slate-100 dark:bg-slate-800  overflow-y-auto h-screen xl:p-5 lg:p-3`}
          >
            {isLoadingNote ? (
              <div className="w-full grid grid-cols-2 gap-2 pt-5">
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
                <div className="h-32 animate_pulse rounded-xl bg-slate-200 overflow-hidden"></div>
              </div>
            ) : showNote.images_count > 0 ? (
              <div className="w-full grid grid-cols-2 gap-2 pt-5">
                {showNote.images.map((image) => {
                  return (
                    <div
                      key={image.id}
                      className="rounded-xl h-32 bg-slate-200 overflow-hidden cursor-pointer"
                    >
                      <PhotoProvider bannerVisible={false} maskOpacity={0.7}>
                        <PhotoView src={image.image}>
                          <img
                            className="object-cover object-center w-full h-full "
                            src={image.thumbail}
                          />
                        </PhotoView>
                      </PhotoProvider>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <div className="text-3xl text-slate-300 font-semibold">
                  No Images
                </div>
              </>
            )}
          </div>
          {/* end image destop */}
        </div>
      )}
    </>
  );
}
