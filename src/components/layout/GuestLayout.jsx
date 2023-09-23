import React from "react";
import Logo from "../Logo";
import ThemeGuest from "../ThemeGuest";

export default function GuestLayout({ children }) {
  return (
    <>
      <div className="flex h-screen min-w-full items-center bg-gradient-to-r from-orange-100 via-yellow-100 to-amber-300 dark:from-cyan-800 dark:via-sky-900 dark:to-blue-800">
        <div className="xl:w-[70%] lg:w-[60%] md:w-[50%] md:flex hidden items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="scale-150">
              <Logo />
            </div>
          </div>
        </div>
        <div className="xl:w-[30%] lg:w-[40%] md:w-[50%] w-full h-screen overflow-y-auto bg-white dark:bg-slate-900">
          <div className="flex md:justify-end justify-between items-center md:pr-5 sm:px-20 px-5 sm:pt-3 pt-4">
            <div className="md:hidden block scale-110">
              <Logo />
            </div>
            <ThemeGuest />
          </div>
          <div className="lg:px-7 md:px-12 sm:px-20 px-5 flex flex-col justify-center py-9">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
