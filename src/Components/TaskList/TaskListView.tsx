import React from "react";
import { Task } from "../../Interfaces/Interfaces";
import TaskCard from "./TaskCard";

export interface TaskListViewProps {
  GroupId: string | undefined;
  GroupName: string | undefined;
  GroupDescription: string | undefined;
  Pending: Task[] | undefined;
  Done: Task[] | undefined;
  Back: any;
}

interface TaskList {
  taskTitle: string;
  Description: string;
  Status: string;
}

const TaskListView: React.FC<TaskListViewProps | undefined> = ({
  GroupId,
  GroupName,
  GroupDescription,
  Pending,
  Done,
  Back,
}) => {
  return (
    <>
      <div className="p-10 mx-auto pt-10 mt-10">
        <div className="flex justify-between">
          <div className="w-5/6">
            <h1 className="text-2xl font-sans font-bold text-blue-700 ml-4 mb-1">
              Task Group: {GroupName}
            </h1>
            <p className="text-xs font-sans w-3/6 text-black ml-4 mb-4">
              {GroupDescription}
            </p>
          </div>

          <button
            //   onClick={openModal}
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500"
          >
            New
          </button>
          <button
            onClick={Back}
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-red-600 transition duration-500"
          >
            Back
          </button>
        </div>
      </div>
      <div className="p-10  mx-auto">
        <h1 className="text-2xl font-sans font-bold text-gray-600 ml-4 mb-4">
          Task Status: Pending ⌛
        </h1>
      </div>
      <div className="p-10 w-full grid grid-cols-4 gap-2  overflow-y-auto">
        {Pending &&
          Pending.map((task) => {
            return (
              <div>
                <TaskCard
                  title={task.taskName}
                  description={task.taskDescription}
                  color="#DBEAFE"
                />
              </div>
            );
          })}
      </div>
      <br />
      <div className="p-10  mx-auto">
        <h1 className="text-2xl font-sans font-bold text-gray-600 ml-4 mb-4">
          Task Status: Done ✅
        </h1>
      </div>
      <div className="p-10 w-full grid grid-cols-4 gap-2  overflow-y-auto">
        {Done &&
          Done.map((task) => {
            return (
              <div>
                <TaskCard
                  title={task.taskName}
                  description={task.taskDescription}
                  color="#E6EE96"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default TaskListView;
