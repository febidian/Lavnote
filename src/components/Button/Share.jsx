import React, { useState, Fragment } from "react";
import Share from "../../assets/svg/Share";
import { Dialog, Transition } from "@headlessui/react";
import axiosClient from "../../../axiosClient";
import Copy from "../../assets/svg/Copy";
import copy from "copy-to-clipboard";
import Checked from "../../assets/svg/Checked";

export default function ShareNote({ note_id, title }) {
  let [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isCopy, setCopy] = useState(false);

  const OpenHandler = async () => {
    setIsOpen(true);
    try {
      let response = await axiosClient.post(`/notes/share/id/${note_id}`);
      if (response.data.status == "success") {
        setUrl(response.data.url);
      }
    } catch (e) {
      console.log(e.response);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    copy(url);
    setCopy(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={OpenHandler}
        className="group rounded-full p-2 border border-slate-300 hover:bg-yellow-200/70 hover:dark:bg-slate-700  transition duration-200"
      >
        <Share />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            setIsOpen(false);
            setCopy(false);
            setUrl("");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
                  >
                    Share
                  </Dialog.Title>
                  <Dialog.Title
                    as="h2"
                    className="text-lg font-medium leading-6 text-gray-800 dark:text-slate-200 mt-3 capitalize"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-3">
                    <div className="w-full rounded-lg h-12 bg-slate-100 dark:bg-slate-700 flex items-center overflow-hidden ">
                      <div
                        className={`${
                          isLoading ? "px-3" : "pr-3"
                        } overflow-x-scroll flex scrollbar-none`}
                      >
                        {isLoading ? (
                          <div className="w-80 h-3 animate-pulse rounded-xl bg-slate-300 dark:bg-slate-500"></div>
                        ) : (
                          <div className="flex-shrink-0 pl-3 text-slate-600 dark:text-slate-100">
                            {url ? (
                              url
                            ) : (
                              <div className="w-[18.5rem] h-3 animate-pulse rounded-xl  bg-slate-300 dark:bg-slate-500"></div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="h-full flex items-center select-none">
                        <button
                          disabled={isLoading ? true : false}
                          type="button"
                          onClick={() => copyToClipboard()}
                          className="px-3 text-slate-600 dark:text-slate-200 text-sm h-full bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-200 border-l-2 inline-flex items-center space-x-1"
                        >
                          {isCopy ? (
                            <>
                              <Checked />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-slate-200">
                      Link can be accessed for the next 30 minutes.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 dark:bg-slate-500 px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false);
                        setCopy(false);
                        setUrl("");
                      }}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
