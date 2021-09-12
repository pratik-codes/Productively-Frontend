import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import FlashCard, { flashCardData } from "../Components/FlashCard/FlashCard";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import { FlashCardData } from "../MockData/FlashCardData";
import {
  addFlashcardGroup,
  getFlashcardGroupList,
} from "../Redux/Actions/FlashcardActions";
import { RootStore } from "../Redux/Store";
import {
  flashcardGroupReduxState,
  flashcardGroups,
  RemainderReduxState,
} from "../Interfaces/Interfaces";
import { getFlashcardAction } from "../Redux/Reducers/flashcardReducers";
import Loader from "../Components/loader";
import FlashcardView from "../Components/FlashCard/FlashcardView";

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

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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

  useEffect(() => {
    if (!flashcard.data) dispatch(getFlashcardGroupList());
  }, []);

  const flashcard: flashcardGroupReduxState = useSelector(
    (state: RootStore) => state.flashcardGroups
  );

  useEffect(() => {
    console.log(flashcard);
  }, [flashcard]);

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
          <div className="flex justify-between w-6/6 pt-10 mx-10 mt-10">
            <h1
              style={{ color: "#e072ff" }}
              className="text-2xl font-sans font-bold  ml-4 mb-4"
            >
              FlashCard Groups 📚 {isOpenFlashCardGroup}
            </h1>
            <button
              onClick={() => openModal()}
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
                            addFlashcard();
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
          <div className="py-10 px-20 w-full grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 gap-4 overflow-y-auto">
            {!flashcard.data ? (
              <Loader />
            ) : flashcard.data.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-5 ">No flashcards</h1>
                <br />
              </div>
            ) : (
              flashcard.data.map((FlashCardGroup) => {
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
