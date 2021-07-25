import React, { useState } from "react";
import AddButton from "../AddButton";
import AddDialogBox from "../AddDialogBox";
import TodoCardComponent from "./TodoCardComponent";

const TodoCard: React.FC = () => {
  const [addPriority, setAddPriority] = useState(false);

  const [tasks, setTasks] = useState([
    { task: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { task: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { task: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { task: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  ]);

  return (
    <div className="h-full overflow-y-auto">
      <div className=" h-6/6 m-5   ">
        <br />
        <div className="flex justify-between">
          <h1 className="text-2xl font-sans font-bold text-blue-800 ml-4 mb-4">
            Top 5 Priorities
          </h1>
          <button
            onClick={() => setAddPriority(true)}
            className="bg-black text-white font-bold mb-4 py-1 px-4 rounded"
          >
            New
          </button>
        </div>
        <div className="m-4">
          {addPriority ? (
            <AddDialogBox
              title="Add Priority"
              CloseFunction={() => setAddPriority(false)}
            />
          ) : (
            <div></div>
          )}
          {tasks.map((task) => {
            return (
              <div>
                <TodoCardComponent task={task.task} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
