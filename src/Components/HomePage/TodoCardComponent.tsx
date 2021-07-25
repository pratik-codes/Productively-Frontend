import React, { useState } from "react";
import edit from "../../Assets/icons/EditButton.png";
import deleteIcon from "../../Assets/icons/Delete.png";

interface TodoCardComponentProps {
  task: string;
}

const TodoCardComponent: React.FC<TodoCardComponentProps> = ({ task }) => {
  return (
    <>
      <div className="bg-blue-100 rounded-2xl my-4 p-4">
        <h1 className="ml-4 font-sans text-black text-l font-medium">{task}</h1>
        <div className="flex justify-end">
          <div className="flex">
            <div
              style={{ borderRadius: "100px" }}
              onClick={() => console.log("edit")}
              className="flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 mr-3"
            >
              <img
                className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                src={edit}
                alt="close"
              />
            </div>
            <div
              style={{ borderRadius: "100px" }}
              onClick={() => console.log("deleteIcon")}
              className="flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3"
            >
              <img
                className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                src={deleteIcon}
                alt="close"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoCardComponent;
