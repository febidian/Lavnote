import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function Guest() {
  const user = window.localStorage.getItem("user");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuth = () => {
      if (user) {
        return navigate("/", { replace: true });
      }
      setIsLoading(false);
    };
    getAuth();
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Toaster
        toastOptions={{
          className:
            "bg-white text-slate-800 border border-yellow-400 dark:bg-slate-800 dark:text-slate-100 dark:border-blue-600",
        }}
      />
      <div>
        <Outlet />
      </div>
    </>
  );
}
