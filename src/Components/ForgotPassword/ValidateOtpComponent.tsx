import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import Productively from "../../Assets/Productively.svg";
import { validateOTPAction } from "../../Redux/Actions/userActions";

interface Props {
  OTPValidatedSignal: any;
  userEmail: string;
}

const ValidateOtpComponent: React.FC<Props> = ({
  OTPValidatedSignal,
  userEmail,
}) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    let OTP =
      ref_input1.current.value +
      ref_input2.current.value +
      ref_input3.current.value +
      ref_input4.current.value;
    OTP = parseInt(OTP);

    const res: any = await dispatch(validateOTPAction(userEmail, OTP));

    if (res.statusCode) {
      if (res.statusCode == 200) {
        OTPValidatedSignal();
        addToast("Correct otp..", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    }

    if (res.data) {
      if (res.data.message === "wrong otp entered!") {
        addToast("wrong otp entered!", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  const ref_input1: any = useRef();
  const ref_input2: any = useRef();
  const ref_input3: any = useRef();
  const ref_input4: any = useRef();

  return (
    <div>
      <div className="Aurora flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div
          //    style={{ backgroundColor: "#DDD6FE" }}
          className="rounded-2xl border-2 border-indigo-400  bg-white mt-20 p-7 max-w-md space-y-8 "
        >
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={Productively}
              alt="logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Validate your OTP
            </h2>
            <p className="font-medium text-indigo-600 hover:text-indigo-500 text-center mt-3">
              Please enter the OTP sent on {userEmail}.
            </p>
          </div>
          <div className="mt-8 space-y-6 ">
            <div className="rounded-md -space-y-px flex justify-center">
              <div>
                <input
                  name="num1"
                  type="number"
                  required
                  maxLength={1}
                  ref={ref_input1}
                  onChange={(e) => {
                    if (e.target.value.length === 1) {
                      ref_input2.current.focus();
                    }
                    if (e.target.value.length === 0) {
                      ref_input1.current.focus();
                    }
                  }}
                  className="w-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-2xl text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  rounded mx-4"
                />
                <input
                  ref={ref_input2}
                  name="num1"
                  type="number"
                  required
                  maxLength={1}
                  onChange={(e) => {
                    if (e.target.value.length === 1) {
                      ref_input3.current.focus();
                    }
                    if (e.target.value.length === 0) {
                      ref_input1.current.focus();
                    }
                  }}
                  className="w-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-2xl text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  rounded mx-4"
                />
                <input
                  name="num1"
                  type="number"
                  required
                  maxLength={1}
                  ref={ref_input3}
                  onChange={(e) => {
                    if (e.target.value.length === 1) {
                      ref_input4.current.focus();
                    }
                    if (e.target.value.length === 0) {
                      ref_input2.current.focus();
                    }
                  }}
                  className="w-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-2xl text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  rounded mx-4"
                />
                <input
                  ref={ref_input4}
                  name="num1"
                  type="number"
                  required
                  maxLength={1}
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      ref_input3.current.focus();
                    }
                  }}
                  className="w-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-2xl text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  rounded mx-4"
                />
              </div>
            </div>
            <br />

            <div>
              <button
                onClick={submitHandler}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Validate!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateOtpComponent;
