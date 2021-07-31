import React, { useEffect, useState } from "react";
import FlashCard, { flashCardData } from "../Components/FlashCard/FlashCard";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import { FlashCardData } from "../MockData/FlashCardData";

interface FlashCardGroupProps {
  flashCardGroupId: string;
  flashCardGroupTitle: string;
  flashCardGroupDescription: string;
  flashCards: flashCardData[];
}

const FlashCardSection = () => {
  const [isOpenFlashCardGroup, setisOpenFlashCardGroup] = useState("");
  const [OpenFlashCardGroupData, setisOpenFlashCardGroupData] = useState<
    FlashCardGroupProps | undefined
  >();

  useEffect(() => {
    if (isOpenFlashCardGroup !== "") {
      const flashCardGroupId = isOpenFlashCardGroup;

      const flashCardGroupData = FlashCardData.find(
        (group) => group.flashCardGroupId === flashCardGroupId
      );
      setisOpenFlashCardGroupData(flashCardGroupData);
      console.log(flashCardGroupData);
    }
  }, [isOpenFlashCardGroup]);

  return (
    <div className="h-full overflow-y-auto">
      {isOpenFlashCardGroup !== "" && (
        <div className="p-10 mx-auto pt-10 mt-10">
          <div className="flex justify-between">
            <div className="w-5/6">
              <h1 className="text-2xl font-sans text-purple-600 font-bold ml-4 mb-1">
                Journal Group: {OpenFlashCardGroupData?.flashCardGroupTitle}{" "}
                {OpenFlashCardGroupData?.flashCardGroupId}
              </h1>
              <p className="text-xs font-sans w-3/6 text-black ml-4 mb-4">
                {OpenFlashCardGroupData?.flashCardGroupDescription}
              </p>
            </div>

            <button
              //   onClick={openModal}
              className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500"
            >
              New
            </button>
            <button
              onClick={() => setisOpenFlashCardGroup("")}
              className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-red-600 transition duration-500"
            >
              Back
            </button>
          </div>
          <div className="mx-auto px-10 py-5 w-full grid grid-cols-2 overflow-y-auto">
            {OpenFlashCardGroupData?.flashCards.map((flashcard) => {
              return (
                <div>
                  <FlashCard color="#FFC3EE" flashCard={flashcard} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isOpenFlashCardGroup === "" && (
        <>
          <div className="flex justify-between w-5/6 mx-auto pt-10 mt-10">
            <h1
              style={{ color: "#e072ff" }}
              className="text-2xl font-sans font-bold  ml-4 mb-4"
            >
              FlashCard Groups 📚 {isOpenFlashCardGroup}
            </h1>
            <button className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-pink-600 transition duration-500">
              New
            </button>
          </div>
          <div className="p-10 h-full w-full grid grid-cols-2 gap-4 overflow-y-auto">
            {FlashCardData.map((FlashCardGroup) => {
              return (
                <div>
                  <TaskGroupCard
                    title={FlashCardGroup.flashCardGroupTitle}
                    description={FlashCardGroup.flashCardGroupDescription}
                    color="#EFC5FA"
                    Open={() => {
                      setisOpenFlashCardGroup(FlashCardGroup.flashCardGroupId);
                      console.log(FlashCardGroup);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FlashCardSection;
