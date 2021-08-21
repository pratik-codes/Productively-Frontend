import React from "react";
import Remainder from "./Remainder";
import TodoCard from "./TodoCard";

const HomePage: React.FC = () => {
  return (
    <div
      className="h-full"
      style={{ overflowY: "scroll", overflowX: "hidden" }}
    >
      <div className="2xl:flex xl:flex l:flex h-full flex-row w-auto">
        <div className="flex-auto 2xl:w-6/12 xl:w-6/12 l:w-full md:w-full sm:w-full m-4 border-r border-gray-300">
          <div className="h-full">
            <Remainder />
          </div>
        </div>
        <div className="h-full 2xl:w-4/12 xl:w-4/12 l:w-full md:w-full sm:w-full">
          <TodoCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
