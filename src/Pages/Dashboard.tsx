import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import Footer from "../Components/Footer";
import edit from "../Assets/icons/EditButton.png";
import contact from "../Assets/icons/contact.svg";
import Productively from "../Assets/Productively.svg";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {});
  return (
    <>
      <div
        style={{ height: "85%" }}
        className="bg-white rounded-xl m-5 shadow-xl align-center justify-center"
      >
        <div className="w-full">
          <h1 className="font-bold text-transparent bg-clip-text text-black xl:text-7xl m-5 p-5 md:text-8xl sm:text-8xl">
            Dashboard
          </h1>
          <div className="w-full flex">
            <div className="xl:w-3/12 l:w-3/12 md:w-12/12 sm:w-12/12 bg-white rounded-xl shadow-2xl mx-auto">
              <div className="flex justify-end">
                <div
                  style={{ borderRadius: "100px" }}
                  onClick={() => console.log("edit")}
                  className="ml-2 flex justify-end items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 mr-3 hover:bg-yellow-600 transition duration-500"
                >
                  <img
                    className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                    src={edit}
                    alt="close"
                  />
                </div>
              </div>
              <div>
                <p className="font-bold text-black text-2xl px-2 mx-12 my-3 border-b-2 border-gray-100">
                  Profile Details
                </p>
              </div>

              <p className="font-bold text-gray-600 pt-3 px-2 mx-12">Name</p>
              <div className="text-center bg-gray-200 rounded-xl bg-white px-4 py-3 mx-12">
                <h1 className="font-bold text-gray-700 text-xl">
                  Hello Name 👋
                </h1>
              </div>
              <p className="font-bold text-gray-600 pt-3 px-2 mx-12">Email</p>
              <div className="text-center bg-gray-200 rounded-xl bg-white py-3 px-2 mx-12 ">
                <p className=" font-bold text-gray-700 text-xl">
                  example@gmail.com
                </p>
              </div>
              <p className="font-bold text-gray-600 pt-3 px-2 mx-12">
                Joined Productively at
              </p>
              <div className="text-center bg-gray-200 rounded-xl bg-white py-3 px-2 mx-12 ">
                <p className=" font-bold text-gray-700 text-xl">12 Dec, 2020</p>
              </div>
              <br></br>
              <br></br>
            </div>
            <div className="xl:w-7/12 l:w-9/12 md:w-12/12 sm:w-12/12 bg-white shadow-2xl rounded-2xl mx-auto px-5">
              <h1 className="font-bold text-transparent bg-clip-text text-black xl:text-5xl m-5 p-5 pb-1 mb-1 md:text-5xl sm:text-3xl">
                Contact us!
              </h1>
              <p className=" text-gray-700 text-m ml-5 pl-5">
                Happy to hear from you regarding any improvements and
                suggestions.<br></br> You can also mail to us
                <a
                  className="text-blue-600"
                  href="mailto:pratiktiwari1212@gmail.com"
                >
                  📧 @example@gmail.com
                </a>
              </p>
              <br></br>
              <div className="flex">
                <div className="w-3/6 p-10">
                  <img
                    className="flex justify-center align-middle mx-4/6 w-4/6 h-full text-gray-700 mx-auto"
                    src={contact}
                    alt="contact"
                  />
                </div>
                <div className="text-center w-3/6 mx-auto p-2">
                  {/* <img
                    className="mx-auto h-12 w-auto"
                    src={Productively}
                    alt="logo"
                  /> */}
                  <form action="" className=" space-y-6">
                    <div className="rounded-md shadow-sm-space-y-px">
                      <div>
                        <label htmlFor="Name" className="sr-only">
                          Name
                        </label>
                        <input
                          maxLength={100}
                          type="text"
                          placeholder="Name"
                          // onChange={(e) => settaskGroupTitle(e.target.value)}
                          // value={taskGroupTitle}
                          className="px-3 py-2 mt-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <input
                          maxLength={100}
                          type="email"
                          placeholder="Email"
                          // onChange={(e) => settaskGroupTitle(e.target.value)}
                          // value={taskGroupTitle}
                          className="px-3 py-2 mt-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <textarea
                          className="px-3 py-2 mt-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          rows={3}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Enter message."
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Send
                      </button>
                      <br />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
