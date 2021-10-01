import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Productively from "../../Assets/Productively.svg";
import { changePasswordAction } from "../../Redux/Actions/userActions";

interface props {
  passwordChangeDone: any;
  userEmail: string;
}

const ChangePasswordForm: React.FC<props> = ({
  passwordChangeDone,
  userEmail,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      addToast("password are not same..", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      passwordChangeDone();
      const res: any = await dispatch(
        changePasswordAction(userEmail, password)
      );
      console.log(res);
      if (res.statusCode) {
        if (res.statusCode === 201) {
          addToast("password updated successfully.", {
            appearance: "success",
            autoDismiss: true,
          });
        }
      }
    }
  };

  return (
    <div className="Aurora flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-10">
      <div
        //    style={{ backgroundColor: "#DDD6FE" }}
        className="rounded-2xl border-2 border-indigo-400  bg-white mt-20 p-7 max-w-md space-y-8 "
      >
        <div>
          <img className="mx-auto h-12 w-auto" src={Productively} alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Type your new password
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="password"
                name="password"
                type="text"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded"
                placeholder="Password"
                value={password}
              />
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="text"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded"
                placeholder="Confirm password"
                value={confirmPassword}
              />
            </div>
          </div>

          <div>
            <button
              onClick={submitHandler}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              update!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
