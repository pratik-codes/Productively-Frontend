import React from "react";
import { Link } from "react-router-dom";
import successSVG from "../../Assets/Images/success.svg";

const Success = () => {
  return (
    <div className="justify-center mx-auto">
      <br />
      <img src={successSVG} className="h-80 mx-auto mt-8" alt="Success" />
      <br />
      <br />
      <div className="">
        <h1 className="font-medium text-center text-xl mx-auto my-auto">
          Your password successfully changed.
        </h1>
        <div className="flex justify-center">
          <Link to="/login">
            <button className="text-center p-2 mt-5 bg-gray-200 rounded-md  cursor-pointer hover:bg-gray-300 transition duration-500 font-bold">
              Redirect to login.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
