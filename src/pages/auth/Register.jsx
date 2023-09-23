import React, { useState, useRef } from "react";
import Logo from "../../components/Logo";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosClient from "../../../axiosClient";
import GuestLayout from "../../components/layout/GuestLayout";

export default function Register() {
  const fullname = useRef("");
  const email = useRef("");
  const password = useRef("");
  const password_confirmation = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let response = await axiosClient.post("/auth/register", {
        name: fullname.current.value,
        email: email.current.value,
        password: password.current.value,
        password_confirmation: password_confirmation.current.value,
      });

      if (response.status == 201) {
        fullname.current.value = "";
        email.current.value = "";
        password.current.value = "";
        password_confirmation.current.value = "";
        toast.success(response.data.message);
        return navigate("/login");
      }
    } catch (e) {
      setErrors(e.response.data.errors);
      setIsLoading(false);
      password.current.value = "";
      password_confirmation.current.value = "";
    }
  };

  return (
    <>
      <GuestLayout>
        <div className="text-slate-900 text-3xl font-semibold dark:text-white">
          Get Started.
        </div>
        <div className="mt-16">
          <div className="text-slate-800 font-medium text-xl dark:text-slate-50">
            Register
          </div>
          <div className="mt-1 text-sm sm:text-slate-500 text-slate-600 font-medium dark:text-slate-300">
            Create an account, and start accessing for free to take notes.
          </div>
        </div>
        <div className="mt-10">
          <form onSubmit={submitHandler}>
            <div>
              <Label title="Name" htmlFor="name" />
              <Input ref={fullname} name="name" placeholder="Andre Finix" />
              {errors && errors.name ? (
                <div className="mt-1 text-xs text-red-400">{errors.name}</div>
              ) : (
                ""
              )}
            </div>
            <div className="sm:mt-3 mt-4">
              <Label title="Email" htmlFor="email" />
              <Input ref={email} name="email" placeholder="Example@your.com" />
              {errors && errors.email ? (
                <div className="mt-1 text-xs text-red-400">{errors.email}</div>
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
              {errors && errors.password ? (
                <div className="mt-1 text-xs text-red-400">
                  {errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="sm:mt-3 mt-4">
              <Label
                title="Password Confirmation"
                htmlFor="password_confirmation"
              />
              <Input
                ref={password_confirmation}
                type="password"
                name="password_confirmation"
                placeholder="***********"
              />
              {errors && errors.password_confirmation ? (
                <div className="mt-1 text-xs text-red-400">
                  {errors.password_confirmation}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-4">
              <Button disabled={isLoading} title="Register" />
            </div>
          </form>
        </div>
        <div className="sm:mt-9 mt-16 text-sm text-center text-slate-600 dark:text-slate-200">
          Have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-500 hover:text-blue-600 transition-colors duration-150 dark:text-blue-300 dark:hover:text-blue-400"
          >
            Login
          </Link>{" "}
          now.
        </div>
      </GuestLayout>
    </>
  );
}
