import React from "react";

const StepsForgotPasswordFlow = () => {
  return (
    <div className="w-5/12 flex mx-auto w-6/6 2xl:w-4/6 xl:w-4/6 l:w-4/6 md:w-4/6 justify-between m-5 px-10">
      <div className="lg:py-6 lg:pr-16">
        <br />
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                <svg
                  className="w-4 text-gray-600"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line
                    fill="none"
                    strokeMiterlimit="10"
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="22"
                  />
                  <polyline
                    fill="none"
                    strokeMiterlimit="10"
                    points="19,15 12,22 5,15"
                  />
                </svg>
              </div>
            </div>
            <div className="w-px h-full bg-gray-300" />
          </div>
          <div className="pt-1 pb-8">
            <p className="mb-2 text-lg font-bold">Step 1</p>
            <p className="text-gray-700">
              User will add thier email id. If the user is already registered
              they will be sent a Email with an OTP.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                <svg
                  className="w-4 text-gray-600"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line
                    fill="none"
                    strokeMiterlimit="10"
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="22"
                  />
                  <polyline
                    fill="none"
                    strokeMiterlimit="10"
                    points="19,15 12,22 5,15"
                  />
                </svg>
              </div>
            </div>
            <div className="w-px h-full bg-gray-300" />
          </div>
          <div className="pt-1 pb-8">
            <p className="mb-2 text-lg font-bold">Step 2</p>
            <p className="text-gray-700">
              After the OTP is received please validated the OTP.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                <svg
                  className="w-4 text-gray-600"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line
                    fill="none"
                    strokeMiterlimit="10"
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="22"
                  />
                  <polyline
                    fill="none"
                    strokeMiterlimit="10"
                    points="19,15 12,22 5,15"
                  />
                </svg>
              </div>
            </div>
            <div className="w-px h-full bg-gray-300" />
          </div>
          <div className="pt-1 pb-8">
            <p className="mb-2 text-lg font-bold">Step 3</p>
            <p className="text-gray-700">
              If the OTP is correct now you can change your password.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center mr-4">
            <div>
              <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                <svg
                  className="w-4 text-gray-600"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <line
                    fill="none"
                    strokeMiterlimit="10"
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="22"
                  />
                  <polyline
                    fill="none"
                    strokeMiterlimit="10"
                    points="19,15 12,22 5,15"
                  />
                </svg>
              </div>
            </div>
            <div className="w-px h-full bg-gray-300" />
          </div>

          <div className="pt-1">
            <p className="mb-2 text-lg font-bold">Success</p>
            <p className="text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsForgotPasswordFlow;
