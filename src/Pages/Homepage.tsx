import React, { useState } from "react";
import SidebarCard from "../Components/SidebarCard";
import tasklist from "../Assets/icons/tasklist.png";
import homepage from "../Assets/icons/homepage.png";
import flashcard from "../Assets/icons/flashcard.png";
import notes from "../Assets/icons/notes.png";
import Journals from "../Assets/icons/journalling.png";
import "../styles/Common.css";
import Footer from "../Components/Footer";
import HomePage from "../Components/HomePage/HomePage";
import TaskList from "./TaskList";

const Homepage: React.FC = () => {
  const [pageOpen, setPageOpen] = useState("Homepage");

  return (
    <>
      <div className="flex align-center justify-center h-5/6">
        <div className="bg-white w-full rounded-xl m-5 s  shadow-xl flex ">
          <div className="w-2/12 ml-3 item-center grid-cols-2 my-7 border-r border-gray-300">
            <div onClick={() => setPageOpen("Homepage")}>
              <SidebarCard
                activeTab={pageOpen}
                title={"Homepage"}
                imgSrc={homepage}
              />
            </div>
            <div onClick={() => setPageOpen("Task List")}>
              <SidebarCard
                activeTab={pageOpen}
                title={"Task List"}
                imgSrc={tasklist}
              />
            </div>
            <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              Learn
            </h1>
            <div onClick={() => setPageOpen("Flash Cards")}>
              <SidebarCard
                activeTab={pageOpen}
                title={"Flash Cards"}
                imgSrc={flashcard}
              />
            </div>
            <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              Reflection
            </h1>
            <div onClick={() => setPageOpen("Journaling")}>
              <SidebarCard
                activeTab={pageOpen}
                title={"Journaling"}
                imgSrc={Journals}
              />
            </div>
          </div>
          <div className="w-10/12 h-full">
            {pageOpen === "Homepage" && <HomePage />}
            {pageOpen === "Task List" && <TaskList />}
            {pageOpen === "Flash Cards" && <h1>FlashCard</h1>}
            {pageOpen === "Journaling" && <h1>Journals</h1>}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Homepage;
