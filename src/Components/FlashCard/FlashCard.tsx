import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import deleteIcon from "../../Assets/icons/Delete.png";
import edit from "../../Assets/icons/EditButton.png";
import {
  deleteFlashcard,
  editFlashcard,
  editFlashcardData,
  getFlashcardGroupList,
} from "../../Redux/Actions/FlashcardActions";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";

export interface flashCardData {
  flashCardId: string;
  flashCardTitle: string;
  flashCardDescription: string;
  data: string;
}

interface flashCardProps {
  color: string;
  flashCardGroupId: string | undefined;
  flashCardId: string;
  flashCardTitle: string;
  flashCardDescription: string;
  data: string;
  back: any;
  multipleDelete: boolean;
  addMultipleDelete: any;
  removeMultipleDelete: any;
}

const FlashCard: React.FC<flashCardProps> = ({
  color,
  flashCardGroupId,
  flashCardId,
  flashCardTitle,
  flashCardDescription,
  data,
  back,
  multipleDelete,
  addMultipleDelete,
  removeMultipleDelete,
}) => {
  const [FrontIsShowing, setFrontIsShowing] = useState(true);
  const [BackIsShowing, setBackIsShowing] = useState(false);
  const [FlashCardTitle, setFlashCardTitle] = useState("");
  const [FlashCardDescription, setFlashCardDescription] = useState("");
  const [FlashCardData, setFlashCardData] = useState("");
  let [editIsOpen, setEditIsOpen] = useState(false);
  let [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState<Boolean>(true);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  function closeEditModal() {
    setEditIsOpen(false);
  }

  function openEditModal() {
    setEditIsOpen(true);
  }
  function closeDeleteModal() {
    setDeleteIsOpen(false);
  }

  function openDeleteModal() {
    setDeleteIsOpen(true);
  }

  const deleteCardHandler = async () => {
    await dispatch(deleteFlashcard(flashCardGroupId, flashCardId));
    addToast("flashcard deleted successfully.", {
      appearance: "error",
      autoDismiss: true,
    });
    dispatch(getFlashcardGroupList());
    back("");
  };

  const editFlashcardHandler = async () => {
    if (!FlashCardTitle || !FlashCardDescription) {
      addToast("Title, description cant be empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      await dispatch(
        editFlashcard(
          flashCardGroupId,
          flashCardId,
          FlashCardTitle,
          FlashCardDescription
        )
      );
      addToast("flashcard addded", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getFlashcardGroupList());
      back("");
    }
  };

  const dataFlashcardHandler = async () => {
    if (!FlashCardData) {
      addToast("Data cant be empty.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      await dispatch(
        editFlashcardData(flashCardGroupId, flashCardId, FlashCardData)
      );
      addToast("flashcard addded", {
        appearance: "success",
        autoDismiss: true,
      });
      await dispatch(getFlashcardGroupList());
      back("");
    }
  };

  const checkBoxHandler = () => {
    if (checkBoxIsChecked) {
      addMultipleDelete();
    }
    if (!checkBoxIsChecked) {
      removeMultipleDelete();
    }
  };

  useEffect(() => {
    setFlashCardTitle(flashCardTitle);
    setFlashCardDescription(flashCardDescription);
    setFlashCardData(data);
  }, []);

  return (
    <>
      <div className="maincontainer">
        <div className="card">
          <Transition
            // as={Fragment}
            show={FrontIsShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="front ">
              <div className="w-6/6 h-full mx-auto">
                <div
                  style={{ background: `${color}` }}
                  className="rounded-2xl p-2 m-3"
                >
                  <div className="flex justify-between">
                    <div
                      className="cursor-pointer w-5/6"
                      onClick={() => {
                        setBackIsShowing(true);
                        setFrontIsShowing(false);
                      }}
                    >
                      <h1 className="ml-4 pt-3 mb-4 font-sans text-black text-2xl font-bold">
                        {flashCardTitle}
                      </h1>
                      <h1 className="ml-4 mb-4 font-sans text-black text-l font-medium">
                        {flashCardDescription}
                      </h1>
                    </div>
                    <div>
                      {multipleDelete ? (
                        <div>
                          <input
                            type="checkbox"
                            onChange={() => {
                              checkBoxHandler();
                              setCheckBoxIsChecked(!checkBoxIsChecked);
                            }}
                            className="mt-2 mr-2 "
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <br></br>
                  <div className="flex justify-end">
                    <div className="flex">
                      <div
                        style={{ borderRadius: "100px" }}
                        onClick={() => setEditIsOpen(true)}
                        className="flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 mr-3 hover:bg-yellow-600 transition duration-500"
                      >
                        <img
                          className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                          src={edit}
                          alt="close"
                        />
                      </div>
                      <Transition appear show={editIsOpen} as={Fragment}>
                        <Dialog
                          as="div"
                          className="fixed inset-0 z-10 overflow-y-auto"
                          onClose={openEditModal}
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
                                  Edit Flashcard Details
                                </Dialog.Title>
                                <div className="mt-2">
                                  <input
                                    maxLength={50}
                                    type="text"
                                    placeholder="Remainder Title"
                                    onChange={(e) =>
                                      setFlashCardTitle(e.target.value)
                                    }
                                    value={FlashCardTitle}
                                    className="px-3 py-2 mt-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                  />
                                  <div className="flex justify-end">
                                    <p style={{ fontSize: "0.8rem" }}>
                                      {FlashCardTitle.length}/50
                                    </p>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Description"
                                    maxLength={150}
                                    onChange={(e) =>
                                      setFlashCardDescription(e.target.value)
                                    }
                                    value={FlashCardDescription}
                                    className="px-3 py-2 mt-3  border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                                  />
                                  <div className="flex justify-end">
                                    <p style={{ fontSize: "0.8rem" }}>
                                      {FlashCardDescription.length}/150
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <button
                                    type="button"
                                    className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => {
                                      closeEditModal();
                                      editFlashcardHandler();
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                    !
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeEditModal}
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
                      <div
                        style={{ borderRadius: "100px" }}
                        onClick={() => setDeleteIsOpen(true)}
                        className="flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 hover:bg-red-600 transition duration-500"
                      >
                        <img
                          className="flex justify-center align-middle mx-auto w-4 h-4 text-gray-700"
                          src={deleteIcon}
                          alt="close"
                        />
                      </div>
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
                                  Delete Task Group
                                </Dialog.Title>
                                <div className="mt-2">
                                  <Dialog.Description>
                                    Are you sure you want to delete this
                                    remainder?
                                  </Dialog.Description>
                                </div>
                                <div
                                  className="mt-4"
                                  onClick={closeDeleteModal}
                                >
                                  <button
                                    type="button"
                                    className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => {
                                      closeDeleteModal();
                                      deleteCardHandler();
                                    }}
                                  >
                                    delete
                                  </button>
                                  <button
                                    type="button"
                                    className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeDeleteModal}
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
                  </div>
                </div>
              </div>
            </div>
          </Transition>
          <Transition
            // as={Fragment}
            show={BackIsShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="back cursor-pointer">
              <div className="w-6/6 h-full mx-auto">
                <div
                  style={{ background: `${color}` }}
                  className="rounded-2xl p-2 m-3 p-5"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setBackIsShowing(false);
                      setFrontIsShowing(true);
                    }}
                  >
                    <h1 className="pt-3 mb-2 font-sans text-black text-2xl font-bold">
                      {flashCardTitle}
                    </h1>
                    <p className="font-bold text-black pt-10">Answer</p>
                  </div>
                  <textarea
                    className=" p-2 mt-2 border-2  border-transparent placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 outline-none focus:outline-none focus:ring ring-pink-900 w-full"
                    rows={10}
                    onChange={(e) => setFlashCardData(e.target.value)}
                    placeholder="Enter Answer."
                    style={{ background: "#ffd3f2" }}
                    value={FlashCardData}
                  />
                  <button
                    type="button"
                    className=" inline-flex justify-center px-4 py-2 text-sm font-medium text-pink-900 bg-pink-100 border border-transparent rounded-md hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500"
                    onClick={() => {
                      closeDeleteModal();
                      dataFlashcardHandler();
                    }}
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>{" "}
          </Transition>
        </div>
      </div>
    </>
  );
};

export default FlashCard;
