import React, { useState } from "react";
import edit from "../../Assets/icons/EditButton.png";
import deleteIcon from "../../Assets/icons/Delete.png";

interface RemainderComponentProps {
  title: string;
  description: string;
  date: string;
}

const RemainderComponent: React.FC<RemainderComponentProps> = ({
  title,
  description,
  date,
}) => {
  const [remaindertitle, setRemaindertitle] = useState("");
  const [remainderdescription, setRemainderDescription] = useState("");
  const [remainderdate, setRemainderDate] = useState("");

  return (
    <div className="w-5/6 mx-auto">
      <div className="bg-yellow-200 rounded-2xl p-2 m-3">
        <h1 className="ml-4 pt-3 mb-4 font-sans text-black text-2xl font-bold">
          {title}
        </h1>
        <h1 className="ml-4 mb-4 font-sans text-black text-l font-medium">
          {description}
        </h1>
        <br></br>
        <div className="flex justify-between">
          <h1 className="ml-4 mt-6 font-sans text-xs font-bold">{date}</h1>
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
    </div>
  );
};

export default RemainderComponent;
