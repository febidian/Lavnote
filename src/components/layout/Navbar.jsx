import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMe } from "../../context/MeContext";
import { toast } from "react-hot-toast";
import ThemeAuth from "../ThemeAuth";
import { useDebouncedCallback } from "use-debounce";
import axiosClient from "../../../axiosClient";
import parse, { attributesToProps } from "html-react-parser";
import WarningMobile from "../WarningMobile";

export default function Navbar() {
  const { withTrashed, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const { user } = useMe();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebouncedCallback(async (searchTerm) => {
    setLoading(true);
    try {
      if (searchTerm) {
        const response = await axiosClient.post("/notes/search", {
          search: searchTerm,
        });

        setResults(response.data.notes);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, 1000);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const ClickHandler = async () => {
    let response = await logout();
    if ((response.status = 200)) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 500);
      return navigate("/login", { replace: true });
    }
  };

  return (
    <>
      {withTrashed == true ? <WarningMobile /> : ""}
      <header>
        <nav className="xl:px-20 md:px-12 px-4 py-4 md:border-b-2 dark:bg-slate-900/80 border-slate-100 flex w-full items-center space-x-2 justify-between">
          <Link to={"/"}>
            <div className="scale-110">
              <Logo />
            </div>
          </Link>
          {/* destop */}
          <div className="flex items-center space-x-4">
            <div className="hidden relative rounded-full md:flex items-center bg-yellow-100 dark:bg-slate-800 lg:w-[30rem] w-80 pr-5">
              <div className="flex-1">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  className="bg-transparent w-full border-0 outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 px-5 h-12 text-slate-600 dark:text-slate-100 dark:placeholder:text-slate-400 placeholder:text-sm placeholder:text-slate-400 "
                  placeholder="Enter keyword your notes . . ."
                />
              </div>
              <div>
                {loading ? (
                  <svg
                    className="w-7 h-7 text-yellow-600"
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-yellow-600 dark:text-blue-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                )}
              </div>
              <div
                className={`${
                  !searchTerm && "hidden"
                } absolute top-14 space-y-1`}
              >
                {results.length > 0 ? (
                  results.map((note, index) => {
                    return (
                      <div
                        key={index}
                        className=" bg-white dark:bg-slate-700 rounded-2xl border-2 border-yellow-100 dark:border-blue-600 lg:w-[30rem] w-80 py-2 px-4 hover:bg-yellow-50 dark:hover:bg-slate-800 transition-all duration-200 overflow-hidden"
                      >
                        <div className="flex items-center w-full justify-between overflow-hidden">
                          <div className="w-4/5 truncate overflow-hidden">
                            <Link
                              className="capitalize   text-slate-700 dark:text-slate-200 text-lg font-medium hover:text-slate-950  transition duration-200 "
                              to={`/note/${note.note_id}`}
                            >
                              {note.title}
                            </Link>
                          </div>
                          {note.category ? (
                            <div className="flex justify-end">
                              <div className="border border-yellow-200 inline-block max-w-[7rem]  rounded-3xl py-1 px-2 text-[11px] truncate capitalize">
                                {note.category}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="text-[13px] dark:text-slate-300 mt-1 leading-relaxed   prose prose-a:text-blue-600 dark:prose-strong:text-slate-300  prose-a:font-medium prose-p:mb-0 prose-p:mt-0 prose-h1:text-xl prose-h1:mt-0 prose-h1:mb-2 prose-h2:text-lg prose-h2:mt-1 prose-h2:mb-2">
                          {parse(note.note_content, {
                            replace: (domNode) => {
                              if (
                                domNode.attribs &&
                                domNode.name === "script"
                              ) {
                                const props = attributesToProps(
                                  domNode.attribs
                                );
                                return <div {...props} />;
                              }
                              if (domNode.attribs && domNode.name === "br") {
                                const props = attributesToProps(
                                  domNode.attribs
                                );
                                return <span {...props} />;
                              }
                            },
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className=" bg-white dark:bg-slate-700 dark:text-slate-400 dark:border-blue-600 text-center rounded-full border-2 border-yellow-100 lg:w-[30rem] w-80 p-3">
                    <div>No Result</div>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <Link
                  to={"/createnotes"}
                  className="bg-yellow-100 hover:bg-yellow-200/75 dark:bg-slate-800 dark:hover:bg-slate-900 transition duration-200 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-yellow-600 dark:text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </Link>
                <div className="text-[12px] whitespace-nowrap mt-1 text-slate-400 dark:text-white">
                  Add Note
                </div>
              </div>
              <div className="flex flex-col items-center">
                <ThemeAuth />
              </div>
              <div className="flex flex-col items-center">
                <button
                  disabled={isLoading}
                  onClick={() => ClickHandler()}
                  className=" bg-yellow-100 hover:bg-yellow-200/75 dark:bg-slate-800 dark:hover:bg-slate-900 transition duration-300 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-yellow-600 dark:text-blue-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </button>
                <div className="text-[12px] mt-1 text-slate-400 dark:text-white">
                  Logout
                </div>
              </div>
            </div>
          </div>
          {/* end destop */}
          <div className="flex justify-end">
            <span className="text-slate-700  dark:text-white text-base font-medium capitalize">
              {user?.name}
            </span>
          </div>
        </nav>
      </header>
      {/* mobile */}

      <div className="px-4 mt-3 md:hidden">
        <div className=" relative rounded-full flex items-center bg-yellow-100 dark:bg-slate-800 md:w-[30rem] w-full pr-5">
          <div className="flex-1">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              className="bg-transparent w-full border-0 outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 px-5 h-12 text-slate-600 dark:text-slate-100 dark:placeholder:text-slate-400 placeholder:text-sm placeholder:text-slate-400 "
              placeholder="Enter keyword your notes . . ."
            />
          </div>
          <div>
            {loading ? (
              <svg
                className="w-7 h-7 text-yellow-600"
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-yellow-600 dark:text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            )}
          </div>
          <div
            className={`${
              !searchTerm && "hidden"
            } absolute top-14 space-y-1 w-full`}
          >
            {results.length > 0 ? (
              results.map((note, index) => {
                return (
                  <div
                    key={index}
                    className=" bg-white dark:bg-slate-700 rounded-2xl border-2 border-yellow-100 dark:border-blue-600 md:w-[30rem] w-full py-2 px-4 hover:bg-yellow-50 dark:hover:bg-slate-800 transition-all duration-200 overflow-hidden"
                  >
                    <div className="flex items-center w-full justify-between overflow-hidden">
                      <div className="w-4/5 truncate overflow-hidden">
                        <Link
                          className="capitalize   text-slate-700 dark:text-slate-200 text-lg font-medium hover:text-slate-950  transition duration-200 "
                          to={`/note/${note.note_id}`}
                        >
                          {note.title}
                        </Link>
                      </div>
                      {note.category ? (
                        <div className="flex justify-end">
                          <div className="border border-yellow-200 dark:border-blue-600  dark:text-slate-100 inline-block max-w-[7rem]  rounded-3xl py-1 px-2 text-[11px] truncate capitalize">
                            {note.category}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="text-[13px] dark:text-slate-300 mt-1 leading-relaxed   prose prose-a:text-blue-600 dark:prose-strong:text-slate-300  prose-a:font-medium prose-p:mb-0 prose-p:mt-0 prose-h1:text-xl prose-h1:mt-0 prose-h1:mb-2 prose-h2:text-lg prose-h2:mt-1 prose-h2:mb-2">
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
                );
              })
            ) : (
              <div className=" bg-white dark:bg-slate-700 dark:text-slate-400 dark:border-blue-600 text-center rounded-full border-2 border-yellow-100  md:w-[30rem] w-full p-3">
                <div>No Result</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4">
          <div className="flex flex-col w-1/3 h-28 items-center">
            <Link
              to={"/createnotes"}
              className="bg-yellow-100 hover:bg-yellow-200/75 dark:bg-slate-800 dark:hover:bg-slate-900 transition duration-200 rounded-2xl  md:rounded-full md:w-10 md:h-10 w-full h-full flex items-center justify-center"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-yellow-600 dark:text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
            <div className="text-[12px] mt-1 text-slate-400 dark:text-white">
              Add Note
            </div>
          </div>
          <div className="flex flex-col w-1/3 h-28 items-center">
            <ThemeAuth />
          </div>
          <div className="flex flex-col w-1/3 h-28 items-center">
            <button
              disabled={isLoading}
              onClick={() => ClickHandler()}
              className=" bg-yellow-100 hover:bg-yellow-200/75 dark:bg-slate-800 dark:hover:bg-slate-900 transition duration-300 rounded-2xl  md:rounded-full md:w-10 md:h-10 w-full h-full flex items-center justify-center"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-yellow-600 dark:text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
            <div className="text-[12px] mt-1 text-slate-400 dark:text-white">
              Logout
            </div>
          </div>
        </div>
      </div>
      {/* end mobile */}
    </>
  );
}
