import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { useMe } from "../context/MeContext";

export default function Auth() {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();
  const { logout } = useAuth();
  let location = useLocation();
  const { note_id } = useParams();
  const { share_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useMe();

  const hideNavbarOnPages = [
    "/createnotes",
    `/note/${note_id}`,
    `/note/${share_id}/share`,
    `/note/update/${note_id}`,
  ]; // Daftar halaman di mana navbar harus disembunyikan
  const shouldHideNavbar = hideNavbarOnPages.includes(location.pathname);

  useEffect(() => {
    const dataUser = async () => {
      setUser(user);
    };
    dataUser();
  }, []);

  useEffect(() => {
    const getAuth = () => {
      if (!user) {
        return navigate("/login", {
          replace: true,
          state: { from: location.pathname },
        });
      }
      setIsLoading(false);
    };
    getAuth();
  }, [user]);

  useEffect(() => {
    const HandleStorangeChange = async (e) => {
      if (e.key === "user") {
        let response = await logout();
        if ((response.status = 200)) {
          toast.success(response.data.message);
          return navigate("/login", { replace: true });
        }
      }
    };

    window.addEventListener("storage", HandleStorangeChange);

    return () => {
      window.removeEventListener("storage", HandleStorangeChange);
    };
  }, []);

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
      <div className="bg-white  dark:bg-slate-900">
        {!shouldHideNavbar && <Navbar />}

        <Outlet />
      </div>
    </>
  );
}
