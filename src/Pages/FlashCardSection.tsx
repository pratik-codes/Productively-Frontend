import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
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
  let [isOpen, setIsOpen] = useState(false);
  const [FlashcardTitle, setFlashcardTitle] = useState("");
  const [FlashcardDescription, setFlashcardDescription] = useState("");
  const [isOpenFlashCardGroup, setisOpenFlashCardGroup] = useState("");
  const [OpenFlashCardGroupData, setisOpenFlashCardGroupData] = useState<
    FlashCardGroupProps | undefined
  >();

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (isOpenFlashCardGroup !== "") {
      const flashCardGroupId = isOpenFlashCardGroup;

      const flashCardGroupData = FlashCardData.find(
        (group) => group.flashCardGroupId === flashCardGroupId
      );
      setisOpenFlashCardGroupData(flashCardGroupData);
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
              // onClick={openModal}
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
            <button
              onClick={openModal}
              className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-pink-600 transition duration-500"
            >
              New
            </button>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={openModal}
              >
                <div className=" px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Add Flashcard Group
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          maxLength={50}
                          value={FlashcardTitle}
                          onChange={(e) => setFlashcardTitle(e.target.value)}
                          placeholder="Flashcard Title"
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {FlashcardTitle.length}/50
                          </p>
                        </div>
                        <input
                          type="text"
                          placeholder="Description"
                          maxLength={150}
                          onChange={(e) =>
                            setFlashcardDescription(e.target.value)
                          }
                          value={FlashcardDescription}
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {FlashcardDescription.length}/150
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => {
                            // addRemainderHandler();
                            closeModal();
                          }}
                        >
                          add!
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
          <div className="p-10 w-full grid grid-cols-2 gap-4 overflow-y-auto">
            {FlashCardData.map((FlashCardGroup) => {
              return (
                <div>
                  <TaskGroupCard
                    id="1212121212"
                    title={FlashCardGroup.flashCardGroupTitle}
                    description={FlashCardGroup.flashCardGroupDescription}
                    color="#EFC5FA"
                    Open={() => {
                      setisOpenFlashCardGroup(FlashCardGroup.flashCardGroupId);
                      console.log(FlashCardGroup);
                    }}
                    type="Flashcards"
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
