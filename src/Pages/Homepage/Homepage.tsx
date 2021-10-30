import React, { useEffect, useState } from "react";
import SidebarCard from "../../Components/SidebarCard";
import tasklist from "../../Assets/icons/tasklist.png";
import homepage from "../../Assets/icons/homepage.png";
import flashcard from "../../Assets/icons/flashcard.png";
import notes from "../../Assets/icons/notes.png";
import Journals from "../../Assets/icons/journalling.png";
import "../../styles/Common.css";
import Footer from "../../Components/Footer";
import HomePage from "../../Components/HomePage/HomePage";
import TaskList from "./TaskList";
import Journaling from "./Journaling";
import FlashCardSection from "./FlashCardSection";
import {
  showNavBarReduxState,
  userViewReduxState,
} from "../../Interfaces/Interfaces";
import { useSelector } from "react-redux";
import { RootStore } from "../../Redux/Store";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import {
  FlashCardSvg,
  HomePageSvg,
  JournalSvg,
  TaskListSvg,
} from "../../Assets/SvgComponents";

export interface homepageProps {
  activeView: string;
}

const Homepage: React.FC<any> = ({ activeView, match }) => {
  const [pageOpen, setPageOpen] = useState("Homepage");

  const showNavbarRedux: showNavBarReduxState = useSelector(
    (state: RootStore) => state.showNavbar
  );

  const showSidebarRedux: showNavBarReduxState = useSelector(
    (state: RootStore) => state.showSidebar
  );

  let params = match.params;

  return (
    <>
      <div
        style={{ height: `${showNavbarRedux.show === true ? "90%" : "99%"}` }}
        className="flex align-center justify-center mx-auto"
      >
        <div className=" mx-4 my-2 bg-white w-full rounded-xl flex">
          <div
            className={`mx-auto sidebar ${
              showSidebarRedux.show === true ? "w-2/12" : "w-24 m-3"
            } mx-2 item-center grid-cols-2 mb-7 mt-2 border-r border-gray-300`}
          >
            <Link to="/homepage">
              <div onClick={() => setPageOpen("Homepage")}>
                <SidebarCard
                  activeTab={pageOpen}
                  title={"Homepage"}
                  icon={<HomePageSvg />}
                  margin={2}
                  showTitle={showSidebarRedux.show}
                />
              </div>
            </Link>
            <Link to="/tasklist">
              <div onClick={() => setPageOpen("Task List")}>
                <SidebarCard
                  activeTab={pageOpen}
                  title={"Task List"}
                  icon={<TaskListSvg />}
                  margin={2}
                  showTitle={showSidebarRedux.show}
                />
              </div>
            </Link>
            {/* <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              "LEARN"
            </h1> */}
            <Link to="/flashcard">
              <div onClick={() => setPageOpen("Flash Cards")}>
                <SidebarCard
                  activeTab={pageOpen}
                  title={"Flash Cards"}
                  icon={<FlashCardSvg />}
                  margin={2}
                  showTitle={showSidebarRedux.show}
                />
              </div>
            </Link>
            {/* <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              "REFLECT"
            </h1> */}
            <Link to="/Journaling">
              <div onClick={() => setPageOpen("Journaling")}>
                <SidebarCard
                  activeTab={pageOpen}
                  title={"Journaling"}
                  icon={<JournalSvg />}
                  margin={2}
                  showTitle={showSidebarRedux.show}
                />
              </div>
            </Link>
          </div>
          <div
            className={`${
              showSidebarRedux.show === true
                ? "2xl:w-full xl:w-full l:w-full"
                : "2xl:w-full xl:w-full l:w-full"
            }2xl:w-10/12 xl:w-10/12 l:w-10/12 w-full h-full`}
          >
            <Switch>
              <Route path="/homepage" component={HomePage} />
              <Route path="/tasklist" component={TaskList} />
              <Route path="/flashcard" component={FlashCardSection} />
              <Route path="/Journaling" component={Journaling} />
            </Switch>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Homepage;
