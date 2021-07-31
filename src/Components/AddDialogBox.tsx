import React, { useState } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import close from "../Assets/icons/close.png";

interface AddDialogProps {
  title: string;
  CloseFunction: any;
}

const AddDialogBox: React.FC<AddDialogProps> = ({ title, CloseFunction }) => {
  return (
    <div className="mx-auto w-5/6 my-4 mx-4 bg-white shadow-xl rounded-xl ">
      <br />
      <div className="flex justify-between">
        <h1 className="ml-4 font-sans text-black text-l font-bold">{title}</h1>
        <div
          onClick={() => CloseFunction()}
          className="flex items-center w-2/10 mr-1 cursor-pointer"
        >
          <img
            className="flex justify-center align-middle mx-4 w-6 h-6 text-gray-700"
            src={close}
            alt="close"
          />
        </div>
      </div>
      {title === "Add Priority" ? (
        <div>
          <input
            type="text"
            placeholder="Priority Description"
            className="px-3 py-2 ml-4 my-3 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-5/6"
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Remainder Title"
            className="px-3 py-2 ml-4 my-3 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-5/6"
          />
          <input
            type="text"
            placeholder="Description"
            className="px-3 py-2 ml-4 mt-3 mb-4 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-5/6"
          />
          <div className="w-2/6 ml-4 ">
            <DatePickerComponent
              id="datepicker"
              placeholder="Select Date"
              min={new Date()}
            />
          </div>
        </div>
      )}

      <button className="bg-black text-white font-bold py-2 px-4 rounded m-4">
        Add
      </button>
    </div>
  );
};

export default AddDialogBox;
