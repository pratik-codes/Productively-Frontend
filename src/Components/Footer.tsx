import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center">
      <div
        // style={{ background: "#08000f" }}
        className="bg-black grid grid-cols-3 grid-rows-1 w-screen m-8 h-96 rounded-2xl shadow-2xl"
      >
        <div>
          <h1 className="text-white font-bold text-3xl font-sans ml-12 mt-12">
            Productively
          </h1>
          <p className="text-white font-sans ml-12 mt-3">
            Productivity app on steroids.
          </p>
        </div>
        <div className="mt-8">
          <ul className="">
            <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300">
              Join the community and contribute
            </li>
            <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300">
              Github
            </li>
            <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300">
              Linkedin
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <ul>
            <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300">
              Made in India ♥️
            </li>
            <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300">
              Email
            </li>
            <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300">
              Phone
            </li>
            <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300">
              Have an idea to discuss? <br />
              shoot a mail now!
            </li>
          </ul>
        </div>
        <div className="flex mt-4">
          <span className="text-white text-bold mb-4 ml-10">
            MADE WITH ❤️ BY PRATIK TIWARI © 2021
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
