import React from "react";
import Remainder from "./Remainder";
import TodoCard from "./TodoCard";

const HomePage: React.FC = () => {
  return (
    <div className="h-full">
      <div className="flex h-full flex-row w-auto">
        <div className="flex-auto w-6/12 m-4 border-r border-gray-300">
          <div className="h-full">
            <Remainder />
          </div>
        </div>
        <div className="h-full w-4/12">
          <TodoCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
