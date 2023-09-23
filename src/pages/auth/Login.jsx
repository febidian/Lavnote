import React, { useRef } from "react";
import Logo from "../../components/Logo";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import GuestLayout from "../../components/layout/GuestLayout";

export default function Login() {
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  let location = useLocation();

  const { login, isLoading, isError } = useAuth();
  // useEffect(() => {
  //   console.log(location);
  // }, []);
  const from = location.state?.from || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    let response = await login(email.current.value, password.current.value);
    if (response.status == 200) {
      email.current.value = "";
      password.current.value = "";
      setTimeout(() => {
        toast.success(response.data.message);
      }, 500);
      return navigate(from, { replace: true });
    } else if (response.status == 422 || response.status == 401) {
      password.current.value = "";
    }
  };

  return (
    <>
      <GuestLayout>
        <div className="text-slate-900 text-3xl font-semibold dark:text-white">
          Welcome Back!
        </div>
        <div className="mt-16">
          <div className="text-slate-800 font-medium text-xl dark:text-slate-50">
            Login
          </div>
          <div className="mt-1 text-sm sm:text-slate-500 text-slate-600 font-medium dark:text-slate-300">
            Start writing and saving what you want to record.
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={submitHandler}>
            <div>
              <Label title="Email" htmlFor="email" />
              <Input ref={email} name="email" placeholder="Example@your.com" />
              {isError && isError.email ? (
                <div className="mt-1 text-xs text-red-400">{isError.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="sm:mt-3 mt-4">
              <Label title="Password" htmlFor="password" />
              <Input
                ref={password}
                type="password"
                name="password"
                placeholder="***********"
              />
              {isError && isError.password ? (
                <div className="mt-1 text-xs text-red-400">
                  {isError.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-4">
              <Button disabled={isLoading} title="Login" />
            </div>
          </form>
        </div>
        <div className="sm:mt-9 mt-16 text-sm text-center text-slate-600 dark:text-slate-200">
          Don't you have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-500 hover:text-blue-600 transition-colors duration-150 dark:text-blue-300 dark:hover:text-blue-400"
          >
            Register
          </Link>{" "}
          now.
        </div>
      </GuestLayout>
    </>
  );
}
