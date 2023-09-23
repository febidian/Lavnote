import React, { Fragment, useState } from "react";
import StarNote from "./Button/Star";
import ShareNote from "./Button/Share";
import DeleteNote from "./Button/Delete";
import Ellipsis from "../assets/svg/Ellipsis";
import CloseTools from "../assets/svg/CloseTools";
import { Menu, Transition } from "@headlessui/react";

export default function ListTools({ note_id, isStar, title, created_at }) {
  const [isTools, setTools] = useState(true);
  return (
    <>
      <div className="border-t h-14">
        <div className="px-4 h-full flex justify-between items-center">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-300">
              Create :
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 truncate">
              {created_at}
            </div>
          </div>

          <Menu as="div" className="relative">
            <div className="flex lg:hidden">
              <Menu.Button type="button" onClick={() => setTools(!isTools)}>
                {isTools ? <Ellipsis /> : <CloseTools />}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Item
                as="div"
                className={`${
                  isTools ? "hidden" : "flex"
                } absolute bottom-7 -right-[13px] z-[100] justify-between p-2 bg-yellow-50 border border-yellow-300 dark:border-blue-600 dark:bg-slate-600  lg:hidden flex-col rounded-2xl space-y-2`}
              >
                <StarNote note_id={note_id} isStar={isStar} />
                <ShareNote note_id={note_id} title={title} />
                <DeleteNote note_id={note_id} isStar={isStar} />
              </Menu.Item>
            </Transition>
            <div className="lg:flex hidden xl:space-x-2 space-x-1">
              <StarNote note_id={note_id} isStar={isStar} />
              <ShareNote note_id={note_id} title={title} />
              <DeleteNote note_id={note_id} isStar={isStar} />
            </div>
          </Menu>
        </div>
      </div>
    </>
  );
}
