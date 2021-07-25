import React, { useState } from "react";
import AddButton from "../AddButton";
import PriorityTaskInput from "./PriorityTaskInput";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import AddDialogBox from "../AddDialogBox";
import RemainderComponent from "./RemainderComponent";

const Remainder = () => {
  const [addRemainder, setAddRemainder] = useState(false);

  const [remainderData, setRemainderData] = useState([
    {
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      date: "12/12/2021",
    },
    {
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      date: "12/12/2021",
    },
    {
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      date: "12/12/2021",
    },
    {
      title: "Demo title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint coaxime mollitia,molestiae quas vel sint ",
      date: "12/12/2021",
    },
  ]);

  return (
    <div className="rounded-2xl h-full overflow-y-auto">
      <div>
        <br />
        <div className="flex justify-between mb-2">
          <h1 className="text-2xl font-sans font-bold text-yellow-700 ml-4 mb-4">
            Remainder Timeline
          </h1>
          <button
            onClick={() => setAddRemainder(true)}
            className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
          >
            New
          </button>
        </div>
        {addRemainder ? (
          <AddDialogBox
            title="Add Remainder"
            CloseFunction={() => setAddRemainder(false)}
          />
        ) : (
          <div></div>
        )}
        <div className="w-full grid grid-cols-2 gap-2">
          {remainderData.map((remainder) => {
            return (
              <div>
                <RemainderComponent
                  title={remainder.title}
                  description={remainder.description}
                  date={remainder.date}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Remainder;
