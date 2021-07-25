import React from "react";
import SidebarCard from "../Components/SidebarCard";
import tasklist from "../Assets/icons/tasklist.png";
import homepage from "../Assets/icons/homepage.png";
import flashcard from "../Assets/icons/flashcard.png";
import notes from "../Assets/icons/notes.png";
import Journals from "../Assets/icons/journalling.png";
import "../styles/Common.css";
import Footer from "../Components/Footer";
import HomePage from "../Components/HomePage/HomePage";

const Homepage: React.FC = () => {
  return (
    <>
      <div className="flex align-center justify-center h-5/6">
        <div className="bg-white w-full  rounded-xl m-5 s  shadow-xl flex ">
          <div className="w-2/12 ml-3 item-center grid-cols-2 my-7 border-r border-gray-300">
            <SidebarCard title={"Homepage"} imgSrc={homepage} />
            <SidebarCard title={"Task List"} imgSrc={tasklist} />
            <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              Learn
            </h1>
            <SidebarCard title={"Notes"} imgSrc={notes} />
            <SidebarCard title={"Flash Cards"} imgSrc={flashcard} />
            <h1 className="font-sans text-gray-800 text-2xl font-bold	ml-6 mb-8 mt-10">
              Selfcare
            </h1>
            <SidebarCard title={"Journaling "} imgSrc={Journals} />
          </div>
          <div className="w-10/12 h-full">
            <HomePage />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
