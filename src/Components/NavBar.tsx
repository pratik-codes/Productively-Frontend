import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import "../styles/ComponentsStyles/NavBar.css";
import Productively from "../Assets/Productively.svg";

export default function NavBar() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const solutions = [
    {
      name: "Insights",
      description: "Measure actions your users take",
      href: "##",
      icon: IconOne,
    },
    {
      name: "Automations",
      description: "Create your own targeted content",
      href: "##",
      icon: IconTwo,
    },
    {
      name: "Reports",
      description: "Keep track of your growth",
      href: "##",
      icon: IconThree,
    },
  ];

  return (
    <div className="NavWrapper">
      <div className="NavContainer ">
        <div className="grid-cols-2 ml-8">
          <Link to="/dashboard">
            <button className="focus:outline-none p-2 text-sm font-medium text-gray-300 hover:text-white  duration-300">
              DASHBOARD
            </button>
          </Link>
        </div>
        <div className="flex bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl px-2 ">
          <div className="flex flex-wrap content-center">
            <img className="h-8" src={Productively} alt="logo" />
          </div>
          <div className="grid-cols-8">
            <Link to="/">
              <button className="focus:outline-none px-2 py-2.5">
                <h2 className="font-bold">PRODUCTIVELY</h2>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex width-screen grid-cols-2 mr-8">
          {login ? (
            <button
              onClick={logout}
              className="focus:outline-none border-gray-500 p-3 text-sm font-medium text-gray-300 hover:text-white duration-300"
            >
              LOGOUT
            </button>
          ) : (
            <Link to="/register">
              <button className="focus:outline-none border-gray-500 p-3 text-sm font-medium text-gray-300 hover:text-white duration-300">
                REGISTER
              </button>
            </Link>
          )}

          <div className="w-full max-w-sm">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? "" : "text-opacity-90"}
                text-white group bg-orange-700 px-1 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <div className="border-2 border-gray-600 rounded-2xl ml-5 flex flex-wrap content-center px-2 py-2 text-gray-300 hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <ChevronDownIcon
                        className={`${open ? "" : "text-opacity-70"}
                  h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                        aria-hidden="true"
                      />
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2 mx-auto my-auto">
                          <h1 className="font-bold text-transparent bg-clip-text text-black xl:text-5xl m-5 p-5 pb-1 mb-1 md:text-4xl sm:text-2xl">
                            Notifications coming soon!
                          </h1>
                        </div>
                        <div className="p-4 bg-gray-50">
                          <a
                            href="##"
                            className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <span className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">
                                Want to collaborate?
                              </span>
                            </span>
                            <span className="block text-sm text-gray-500">
                              You can contribute to the project through github
                              or reach out to us by email.
                            </span>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}
