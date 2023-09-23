import React, { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import parse, { attributesToProps } from "html-react-parser";
import HomeSvg from "../../assets/svg/Home";
import Copy from "../../assets/svg/Copy";
import toast from "react-hot-toast";

export default function ShowShareNotes() {
  const [showNote, setshowNote] = useState({});
  const { share_id } = useParams();
  const [isLoadingNote, setLoading] = useState(true);
  const [isLoadingDuplicate, setLoadingDuplicate] = useState(false);
  const [isError, setError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const getShowShare = async () => {
      try {
        let response = await axiosClient.get(`notes/share/id/${share_id}`);
        console.log(response);
        if (response.data.status == "success") {
          setshowNote(response.data.note);
        }
      } catch (error) {
        if (error.response.status == 404) {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    getShowShare();
  }, []);

  const duplicateHandler = async () => {
    try {
      setLoadingDuplicate(true);
      let response = await axiosClient.post(`/notes/id/${share_id}/duplicate`);
      toast.success(response.data.message);
      return navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoadingDuplicate(false);
    }
  };
  return (
    <>
      {isError ? (
        <div className="min-h-screen flex flex-col items-center justify-center md:text-6xl text-4xl text-yellow-400 dark:text-slate-700 text-center">
          <span>The page has expired.</span>
          <Link
            className=" mt-4 md:text-xl text-lg border hover:text-slate-500 dark:hover:text-slate-200  hover:bg-yellow-200 dark:hover:bg-slate-400 transition-all duration-200 border-yellow-400 dark:border-gray-700 rounded-lg md:p-3 p-2"
            to={"/"}
          >
            Back Home
          </Link>
        </div>
      ) : (
        <div className="min-h-screen flex">
          <div className="lg:w-[73%] w-full overflow-y-auto h-screen block justify-center">
            {isLoadingNote ? (
              ""
            ) : (
              <div className="sm:h-9 h-14 bg-yellow-200 dark:bg-slate-700 w-full flex items-center justify-center text-slate-600 dark:text-slate-200 text-sm space-x-3 px-3">
                <span>
                  {" "}
                  You can duplicate the note by clicking the{" "}
                  <button
                    disabled={isLoadingDuplicate ? true : false}
                    type="button"
                    onClick={() => duplicateHandler()}
                    className="inline-flex items-center space-x-1 group border border-slate-700 dark:border-slate-200 rounded-md px-3 py-1"
                  >
                    <span>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 stroke-slate-800 dark:stroke-slate-300 group-hover:stroke-yellow-600 dark:group-hover:stroke-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                        />
                      </svg>
                    </span>
                    <span className="group-hover:text-yellow-600 dark:group-hover:text-blue-500">
                      Duplicate
                    </span>
                  </button>{" "}
                  or you can go back to the{" "}
                  <Link
                    to={"/"}
                    className="inline-flex items-center space-x-1 "
                  >
                    {" "}
                    <span className="underline">Home Page</span>
                    <span>
                      <HomeSvg />
                    </span>{" "}
                  </Link>
                  . Thank you!
                </span>
              </div>
            )}
            <div className="w-full xl:px-24 lg:px-10 md:px-12 px-3 py-10">
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
              </div>
              {/* <div className="h-8"></div> */}
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
