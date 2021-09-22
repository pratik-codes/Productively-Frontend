import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FlashCard from "./FlashCard";
import { flashcard } from "../../Interfaces/Interfaces";
import Loader from "../loader";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  addFlashcard,
  deleteMultipleFlashcardsHandler,
  getFlashcardGroupList,
} from "../../Redux/Actions/FlashcardActions";

interface flashCardViewProps {
  flashCardGroupId: string | undefined;
  flashCardGroupName: string | undefined;
  flashCardGroupDescription: string | undefined;
  flashcards: flashcard[] | undefined;
  back: any;
}

const FlashcardView: React.FC<flashCardViewProps> = ({
  flashCardGroupId,
  flashCardGroupName,
  flashCardGroupDescription,
  flashcards,
  back,
}) => {
  let [isOpenFlashcard, setIsOpenFlashcard] = useState(false);
  const [FlashcardTitle, setFlashcardTitle] = useState("");
  const [FlashcardDescription, setFlashcardDescription] = useState("");
  const [FlashcardData, setFlashcardData] = useState("");
  const [multipleDelete, setMultipleDelete] = useState(false);
  const [cardsToDelete, setCardsToDelete] = useState<string[]>([]);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeNewFlashcardModal() {
    setIsOpenFlashcard(false);
  }

  function openNewFlashcardModal() {
    setIsOpenFlashcard(true);
  }

  function closeDeleteModal() {
    setDeleteIsOpen(false);
  }

  function openDeleteModal() {
    setDeleteIsOpen(true);
  }

  const addFlashcardHandler = async () => {
    if (!FlashcardTitle || !FlashcardDescription || !FlashcardData) {
      addToast("Title, description and data cant be empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      await dispatch(
        addFlashcard(
          FlashcardTitle,
          FlashcardDescription,
          FlashcardData,
          flashCardGroupId
        )
      );
      addToast("flashcard addded", {
        appearance: "success",
        autoDismiss: true,
      });
      await dispatch(getFlashcardGroupList());
      back("");
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
      await dispatch(
        deleteMultipleFlashcardsHandler(flashCardGroupId, remainderIds)
      );
      addToast("Reminders deleted successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      setCardsToDelete([]);
      dispatch(getFlashcardGroupList());
      back("");
    }
  };

  return (
    <>
      <div className="p-5 mx-auto pt-10 mt-10 2xl:p-10 xl:p-10 l:p-10 md:p-10">
        <div className="flex flex-col-reverse 2xl:flex-row xl:flex-row l:flex-row md:flex-row justify-between">
          <div className="w-6/6 2xl:w-5/6 xl:w-5/6 l:w-5/6 md:w-5/6">
            <h1 className="text-xl 2xl:text-2xl xl:text-2xl l:text-2xl md:text-2xl font-sans font-bold text-blue-700 ml-4 mb-1">
              Flashcard Group: {flashCardGroupName}{" "}
            </h1>
            <p className="text-xs font-sans w-3/6 text-black ml-4 mb-4">
              {flashCardGroupDescription}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={openNewFlashcardModal}
              className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500 "
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
              <div className="flex">
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
            <button
              onClick={() => back("")}
              className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500 "
            >
              Back
            </button>
          </div>
          <Transition appear show={isOpenFlashcard} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={openNewFlashcardModal}
            >
              <div className=" px-4 text-center">
                <Transition.Child
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
                      <textarea
                        className=" p-2 mt-2 border-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 outline-none shadow outline-none focus:outline-none focus:ring  w-full"
                        rows={5}
                        onChange={(e) => setFlashcardData(e.target.value)}
                        placeholder="Enter Data."
                        value={FlashcardData}
                      ></textarea>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          addFlashcardHandler();
                          closeNewFlashcardModal();
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
                        onClick={closeNewFlashcardModal}
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
                      Delete Multiple Remainder
                    </Dialog.Title>
                    <div className="mt-2">
                      <Dialog.Description>
                        Are you sure you want to delete all the reminders?
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

        <div className="pt-2 2xl:p-10 xl:p-10 lg:p-10 md:p-10 w-full grid 2xl:grid-cols-2 xl:grid-cols-2 l:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 overflow-y-auto">
          {!flashcards ? (
            <Loader />
          ) : flashcards.length === 0 ? (
            <div className="">
              <br />
              <h1 className="text-l ml-5 ">No Tasks</h1>
              <br />
            </div>
          ) : (
            flashcards
              .filter((value) => {
                if (searchInput === "") {
                  return value;
                } else if (
                  value.flashcardName
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase()) ||
                  value.flashcardDescription
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              .map((card) => {
                return (
                  <div>
                    <FlashCard
                      color="#FFC3EE"
                      flashCardGroupId={flashCardGroupId}
                      flashCardId={card.flashcardId}
                      flashCardTitle={card.flashcardName}
                      flashCardDescription={card.flashcardDescription}
                      data={card.data}
                      back={back}
                      multipleDelete={multipleDelete}
                      addMultipleDelete={() =>
                        addCardsToAddOrDelete(card.flashcardId, true)
                      }
                      removeMultipleDelete={() =>
                        addCardsToAddOrDelete(card.flashcardId, false)
                      }
                    />
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
};

export default FlashcardView;
