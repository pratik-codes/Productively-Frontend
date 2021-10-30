import React, { useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import Productively from "../Assets/Productively.svg";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../Redux/Store";
import { LoginAction } from "../Redux/Actions/userActions";
import { LoginReduxState } from "../Interfaces/Interfaces";
import { userInfo } from "os";

const Login = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const login = async (event: any) => {
    event.preventDefault();
    const email = event.target[1].value;
    const password = event.target[2].value;
    const res: any = await dispatch(LoginAction(email, password));

    if (res === true) {
      addToast("User logged in!", {
        appearance: "success",
        autoDismiss: true,
      });
      setTimeout(() => {
        window.location.href = "/homepage";
      }, 1000);
    } else {
      addToast(`${res}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="Aurora flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl mt-20 p-7 max-w-md w-full space-y-8 shadow-2xl">
        <div>
          <img className="mx-auto h-12 w-auto" src={Productively} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sing up if you don't have account.
            </a>
          </p>
        </div>
        <form action="" className="mt-8 space-y-6" onSubmit={login}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="/forgotpassword"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-0 2xl:bottom-0 xl:bottom-0 l:bottom-0 md:bottom-0 right-0 mx-3 my-3">
        <p className="invisible 2xl:visible xl:visible l:visible md:visible mr-3 inline-flex justify-center px-2 py-1 text-sm font-medium text-purple-900 bg-purple-100 border border-transparent rounded-2xl">
          Test user:
          <br />
          Email: testuser@example.com
          <br />
          Password: testuser
        </p>
      </div>
    </div>
  );
};

export default Login;
