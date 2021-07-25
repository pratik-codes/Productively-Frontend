import React from "react";
import addImage from "../Assets/icons/add.png";

interface AddCardProps {
  text: string;
}

const AddButton: React.FC<AddCardProps> = ({ text }) => {
  return (
    <div className="flex px-4 py-2 text-sm font-medium text-white bg-gray-400 cursor-pointer rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <div className="flex items-center w-4/10">
        <img
          className="flex justify-center align-middle mx-4 w-5 h-5 text-black"
          src={addImage}
          alt="logo"
        />
      </div>
      <div className="w-8/12 flex items-center justify-start align-middle">
        <h3 className=" font-sans text-md font-bold text-black">{text}</h3>
      </div>
    </div>
  );
};

export default AddButton;
