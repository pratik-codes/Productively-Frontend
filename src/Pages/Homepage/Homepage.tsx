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
import { userViewReduxState } from "../../Interfaces/Interfaces";
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

const Homepage: React.FC<homepageProps> = ({ activeView }) => {
  const [pageOpen, setPageOpen] = useState("Homepage");

  const userView: userViewReduxState = useSelector(
    (state: RootStore) => state.userViewInfo
  );

  useEffect(() => {
    if (activeView) {
      setPageOpen(activeView);
    } else {
      setPageOpen("Homepage");
    }
  }, [activeView]);

  return (
    <>
      <div
        style={{ height: "90%" }}
        className="flex align-center justify-center mx-auto"
      >
        <div className="mx-4 my-2 bg-white w-full rounded-xl flex">
          <div className="sidebar absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out w-2/12 ml-3 item-center grid-cols-2 my-7 border-r border-gray-300">
            <Link to="/">
              <div onClick={() => setPageOpen("Homepage")}>
                <SidebarCard
                  activeTab={pageOpen}
                  title={"Homepage"}
                  icon={<HomePageSvg />}
                  margin={2}
                />
              </div>
            </Link>
            <Link to="/tasklists">
              <div onClick={() => setPageOpen("Task List")}>
                <SidebarCard
                  activeTab={pageOpen}
                  title={"Task List"}
                  icon={<TaskListSvg />}
                  margin={2}
                />
              </div>
            </Link>
            {/* <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              "LEARN"
            </h1> */}
            <Link to="/flashcards">
              <div onClick={() => setPageOpen("Flash Cards")}>
                <SidebarCard
                  activeTab={pageOpen}
                  title={"Flash Cards"}
                  icon={<FlashCardSvg />}
                  margin={2}
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
                />
              </div>
            </Link>
          </div>
          <div className="2xl:w-10/12 xl:w-10/12 l:w-10/12 w-full h-full">
            {pageOpen === "Homepage" && <HomePage />}
            {pageOpen === "Task List" && <TaskList />}
            {pageOpen === "Flash Cards" && <FlashCardSection />}
            {pageOpen === "Journaling" && <Journaling />}
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Homepage;
