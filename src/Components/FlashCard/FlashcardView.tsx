import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FlashCard from "./FlashCard";
import { flashcard } from "../../Interfaces/Interfaces";
import Loader from "../loader";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  addFlashcard,
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

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeNewFlashcardModal() {
    setIsOpenFlashcard(false);
  }

  function openNewFlashcardModal() {
    setIsOpenFlashcard(true);
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
  return (
    <>
      <div className="p-10 mx-auto pt-10 mt-10">
        <div className="flex justify-between">
          <div className="w-5/6">
            <h1 className="text-2xl font-sans text-purple-600 font-bold ml-4 mb-1">
              Journal Group: {flashCardGroupName}{" "}
            </h1>
            <p className="text-xs font-sans w-3/6 text-black ml-4 mb-4">
              {flashCardGroupDescription}
            </p>
          </div>

          <button
            onClick={openNewFlashcardModal}
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500"
          >
            New
          </button>
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
                        add!
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeNewFlashcardModal}
                      >
                        cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
          <button
            onClick={() => back("")}
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-red-600 transition duration-500"
          >
            Back
          </button>
        </div>
        <div className="mx-auto px-10 py-5 w-full grid 2xl:grid-cols-2 xl:grid-cols-2 l:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 overflow-y-auto">
          {!flashcards ? (
            <Loader />
          ) : (
            flashcards.map((card) => {
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
