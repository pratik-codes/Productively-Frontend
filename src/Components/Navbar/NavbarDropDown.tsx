import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import SidebarCard from "../SidebarCard";
import tasklist from "../../Assets/icons/tasklist.png";
import homepage from "../../Assets/icons/homepage.png";
import flashcard from "../../Assets/icons/flashcard.png";
import notes from "../../Assets/icons/notes.png";
import Journals from "../../Assets/icons/journalling.png";
import Logout from "../../Assets/icons/logout.png";
import { userHomePageViewAction } from "../../Redux/Actions/userActions";
import LogoutSvg, {
  DashboardSvg,
  FlashCardSvg,
  HomePageSvg,
  JournalSvg,
  TaskListSvg,
} from "../../Assets/SvgComponents";

export const NavbarDropDown = () => {
  const [pageOpen, setPageOpen] = useState("Homepage");
  const [login, setLogin] = useState(false);

  const dispatch = useDispatch();

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

  const setUserHomePageView = (viewName: string) => {
    dispatch(userHomePageViewAction(viewName));
    console.log(viewName);
  };

  return (
    <div className="w-full ml-2">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full p-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-2xl border-2 border-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            /> */}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Link to="/homepage">
                <div
                  onClick={() => {
                    setPageOpen("Homepage");
                  }}
                >
                  <SidebarCard
                    activeTab={pageOpen}
                    title={"Homepage"}
                    icon={<HomePageSvg />}
                    margin={1}
                    showTitle={true}
                  />
                </div>
              </Link>
              <Link to="/tasklist">
                <div
                  onClick={() => {
                    setPageOpen("Task List");
                  }}
                >
                  <SidebarCard
                    activeTab={pageOpen}
                    title={"Task List"}
                    icon={<TaskListSvg />}
                    margin={1}
                    showTitle={true}
                  />
                </div>
              </Link>
              {/* <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              "LEARN"
            </h1> */}
              <Link to="/flashcard">
                <div
                  onClick={() => {
                    setPageOpen("Flash Cards");
                  }}
                >
                  <SidebarCard
                    activeTab={pageOpen}
                    title={"Flash Cards"}
                    icon={<FlashCardSvg />}
                    margin={1}
                    showTitle={true}
                  />
                </div>
              </Link>
              {/* <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              "REFLECT"
            </h1> */}
              <Link to="/Journaling">
                <div
                  onClick={() => {
                    setPageOpen("Journaling");
                  }}
                >
                  <SidebarCard
                    activeTab={pageOpen}
                    title={"Journaling"}
                    icon={<JournalSvg />}
                    margin={1}
                    showTitle={true}
                  />
                </div>
              </Link>

              <Link to="/dashboard">
                <div>
                  <SidebarCard
                    activeTab={pageOpen}
                    title={"Dashboard"}
                    icon={<DashboardSvg />}
                    margin={1}
                    showTitle={true}
                  />
                </div>
              </Link>

              {login === true ? (
                <div onClick={logout}>
                  <SidebarCard
                    activeTab={pageOpen}
                    title={"Logout"}
                    icon={<LogoutSvg />}
                    margin={1}
                    showTitle={true}
                  />
                </div>
              ) : null}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
