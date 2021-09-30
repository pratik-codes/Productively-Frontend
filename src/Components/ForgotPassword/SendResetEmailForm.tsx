import { Props } from "@headlessui/react/dist/types";
import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

import Productively from "../../Assets/Productively.svg";
import { userChangePasswordRequestAction } from "../../Redux/Actions/userActions";

interface props {
  resetEmailSent: any;
  setUserEmailId: any;
}

const SendResetEmailForm: React.FC<props> = ({
  resetEmailSent,
  setUserEmailId,
}) => {
  const [Email, setEmail] = useState("");

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const submitHandler = async (email: string) => {
    // regex to check for email
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regexEmail)) {
      setUserEmailId(email);
      const res: any = await dispatch(userChangePasswordRequestAction(email));

      if (res.statusCode) {
        if (res.statusCode == 201) {
          resetEmailSent();
          addToast("reset email sent.", {
            appearance: "success",
            autoDismiss: true,
          });
        }
      }

      if (res.message === "Request failed with status code 404") {
        console.log("Request failed with status code 404 inside if");
        addToast("user not found.", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else {
      addToast("Add a valid email id.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="Aurora flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div
        //    style={{ backgroundColor: "#DDD6FE" }}
        className="rounded-2xl border-2 border-indigo-400  bg-white mt-20 p-7 max-w-md space-y-8 "
      >
        <div>
          <img className="mx-auto h-12 w-auto" src={Productively} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sing in if you dont want to change your password.
            </a>
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md -space-y-px">
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
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded"
                placeholder="Email address"
                value={Email}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                want to create a new account?
              </a>
            </div>
          </div>
          <div>
            <button
              onClick={() => submitHandler(Email)}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendResetEmailForm;
