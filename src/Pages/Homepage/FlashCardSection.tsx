import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import FlashCard, { flashCardData } from "../../Components/FlashCard/FlashCard";
import TaskGroupCard from "../../Components/TaskList/TaskGroupCard";
import { FlashCardData } from "../../MockData/FlashCardData";
import {
  addFlashcardGroup,
  deleteMultipleFlashcardGroupHandler,
  getFlashcardGroupList,
} from "../../Redux/Actions/FlashcardActions";
import { RootStore } from "../../Redux/Store";
import {
  flashcardGroupReduxState,
  flashcardGroups,
  RemainderReduxState,
} from "../../Interfaces/Interfaces";
import { getFlashcardAction } from "../../Redux/Reducers/flashcardReducers";
import Loader from "../../Components/loader";
import FlashcardView from "../../Components/FlashCard/FlashcardView";

import { gsap, TimelineLite, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
  const [OpenFlashCardGroupData, setisOpenFlashCardGroupData] =
    useState<flashcardGroups>();
  const [multipleDelete, setMultipleDelete] = useState(false);
  const [cardsToDelete, setCardsToDelete] = useState<string[]>([]);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeDeleteModal() {
    setDeleteIsOpen(false);
  }

  function openDeleteModal() {
    setDeleteIsOpen(true);
  }

  let t1 = new TimelineLite({ delay: 0.3 });

  useEffect(() => {
    t1.staggerFrom(
      ".animate",
      1,
      { y: 30, ease: Power3.easeOut, opacity: 0 },
      0.15
    );
  }, [t1]);

  const addFlashcard = async () => {
    if (FlashcardTitle || FlashcardDescription) {
      await dispatch(addFlashcardGroup(FlashcardTitle, FlashcardDescription));
      addToast("flashcard addded", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getFlashcardGroupList());
    } else {
      addToast("Title, description cant be empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const addCardsToAddOrDelete = (id: string, add: boolean) => {
    if (add === true) cardsToDelete.push(id);
    else {
      var idIndex = cardsToDelete.indexOf(id);
      cardsToDelete.splice(idIndex, 1);
    }
    console.log(cardsToDelete);
  };

  const multipleDeleteHandler = async (remainderIds: string[]) => {
    if (remainderIds.length === 0) {
      addToast("No cards selected to delete.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      await dispatch(deleteMultipleFlashcardGroupHandler(remainderIds));
      addToast("Reminders deleted successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      setCardsToDelete([]);
      dispatch(getFlashcardGroupList());
    }
  };

  useEffect(() => {
    if (!flashcard.data) dispatch(getFlashcardGroupList());
    console.log(flashcard.data);
  }, []);

  const flashcard: flashcardGroupReduxState = useSelector(
    (state: RootStore) => state.flashcardGroups
  );

  useEffect(() => {
    if (isOpenFlashCardGroup !== "") {
      const flashCardGroupId = isOpenFlashCardGroup;
      console.log(flashcard);
      const flashCardGroupData = flashcard.data.find(
        (group) => group._id === flashCardGroupId
      );
      setisOpenFlashCardGroupData(flashCardGroupData);
    }
  }, [isOpenFlashCardGroup]);

  return (
    <div className="h-full overflow-y-auto">
      {isOpenFlashCardGroup !== "" && (
        <FlashcardView
          flashCardGroupId={OpenFlashCardGroupData?._id}
          flashCardGroupName={OpenFlashCardGroupData?.groupName}
          flashCardGroupDescription={OpenFlashCardGroupData?.groupDescription}
          flashcards={OpenFlashCardGroupData?.flashcard}
          back={setisOpenFlashCardGroup}
        />
      )}
      {isOpenFlashCardGroup === "" && (
        <>
          <div className="flex justify-between w-6/6 pt-10 mx-5 2xl:mx-10 xl:mx-10 l:mx-10 md:mx-10 mt-5 2xl:mt-10 xl:mt-10 l:mt-10 md:mt-10">
            <div>
              <h1
                style={{ color: "#e072ff" }}
                className="text-xl 2xl:text-2xl xl:text-2xl l:text-2xl md:text-2xl font-sans font-bold text-purple-700 mx-4"
              >
                FlashCard Groups 📚 {isOpenFlashCardGroup}
              </h1>
            </div>
            <div className="flex">
              <button
                onClick={() => openModal()}
                className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-pink-600 transition duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              {multipleDelete ? (
                <div>
                  <button
                    onClick={() => {
                      openDeleteModal();
                    }}
                    className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setMultipleDelete(false);
                    }}
                    className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMultipleDelete(!multipleDelete);
                  }}
                  className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>

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
                            addFlashcard();
                            closeModal();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>

            <Transition appear show={deleteIsOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={openDeleteModal}
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
                        Delete Multiple Flashcards
                      </Dialog.Title>
                      <div className="mt-2">
                        <Dialog.Description>
                          Are you sure you want to delete all the Flashcards?
                        </Dialog.Description>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => {
                            closeDeleteModal();
                            multipleDeleteHandler(cardsToDelete);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => {
                            closeDeleteModal();
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>

          {/* search component */}
          <div
            className="flex items-center w-5/6 mx-auto bg-white rounded-md shadow-md mt-4"
            x-data="{ search: '' }"
          >
            <div className="w-full">
              <input
                type="search"
                className="w-full px-4 py-1 text-gray-900 rounded-md focus:outline-none"
                placeholder="search"
                x-model="search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className={`flex items-center justify-center w-12 h-12 text-gray-100 rounded-md ${
                  searchInput.length > 0 ? "bg-purple-500" : "bg-gray-500"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="py-10 px-2 2xl:px-20 xl:px-20 l:px-20 md:px-20 w-full grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 gap-4 overflow-y-auto ">
            {!flashcard.data ? (
              <Loader />
            ) : flashcard.data.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-5 font-bold">No flashcards</h1>
                <br />
              </div>
            ) : (
              flashcard.data
                .filter((value) => {
                  if (searchInput === "") {
                    return value;
                  } else if (
                    value.groupName
                      .toLocaleLowerCase()
                      .includes(searchInput.toLocaleLowerCase()) ||
                    value.groupDescription
                      .toLocaleLowerCase()
                      .includes(searchInput.toLocaleLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((FlashCardGroup) => {
                  return (
                    <div style={{ marginBottom: "2rem" }}>
                      <TaskGroupCard
                        id={FlashCardGroup._id}
                        title={FlashCardGroup.groupName}
                        description={FlashCardGroup.groupDescription}
                        color="#EFC5FA"
                        Open={() => {
                          setisOpenFlashCardGroup(FlashCardGroup._id);
                          console.log(FlashCardGroup);
                        }}
                        type="Flashcards"
                        multipleDelete={multipleDelete}
                        addMultipleDelete={() =>
                          addCardsToAddOrDelete(FlashCardGroup._id, true)
                        }
                        removeMultipleDelete={() =>
                          addCardsToAddOrDelete(FlashCardGroup._id, false)
                        }
                      />
                    </div>
                  );
                })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FlashCardSection;
