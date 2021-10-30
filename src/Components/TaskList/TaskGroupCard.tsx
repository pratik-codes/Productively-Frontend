import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import edit from "../../Assets/icons/EditButton.png";
import deleteIcon from "../../Assets/icons/Delete.png";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  deleteTaskGroup,
  editTaskGroup,
  getTaskList,
} from "../../Redux/Actions/taskActions";
import { useEffect } from "react";
import {
  deleteFlashcardGroup,
  editFlashcardGroup,
  getFlashcardGroupList,
} from "../../Redux/Actions/FlashcardActions";
import {
  deleteJournalGroup,
  editJournalGroup,
  getJournalGroupList,
} from "../../Redux/Actions/JournalActions";
import { Link } from "react-router-dom";

interface RemainderComponentProps {
  id: string;
  title: string;
  description: string;
  color: string;
  Open: any;
  type: string;
  multipleDelete: boolean;
  addMultipleDelete: any;
  removeMultipleDelete: any;
}

const TaskGroupCard: React.FC<RemainderComponentProps> = ({
  id,
  title,
  description,
  color,
  Open,
  type,
  multipleDelete,
  addMultipleDelete,
  removeMultipleDelete,
}) => {
  const [taskGroupTitle, settaskGroupTitle] = useState("");
  const [taskGroupDescription, settaskGroupDescription] = useState("");
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
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

  const checkBoxHandler = () => {
    if (checkBoxIsChecked) {
      addMultipleDelete();
    }
    if (!checkBoxIsChecked) {
      removeMultipleDelete();
    }
  };

  useEffect(() => {
    settaskGroupTitle(title);
    settaskGroupDescription(description);
  }, []);

  const editTaskGroupDetailsHandler = async () => {
    if (type === "tasklist") {
      if (!taskGroupTitle || !taskGroupDescription) {
        addToast("Title, description cant be empty.", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        await dispatch(editTaskGroup(taskGroupTitle, taskGroupDescription, id));
        addToast("remainder edited successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(getTaskList());
      }
    }
    if (type === "flashcard") {
      if (!taskGroupTitle || !taskGroupDescription) {
        addToast("Title, description cant be empty.", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        await dispatch(
          editFlashcardGroup(taskGroupTitle, taskGroupDescription, id)
        );
        addToast("Flashcard edited successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(getFlashcardGroupList());
      }
    }
    if (type === "Journaling") {
      console.log("inside journals function");
      if (!taskGroupTitle || !taskGroupDescription) {
        addToast("Title, description cant be empty.", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        await dispatch(
          editJournalGroup(taskGroupTitle, taskGroupDescription, id)
        );
        addToast("Flashcard edited successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(getJournalGroupList());
      }
    }
  };

  const deleteTaskGroupHandler = async () => {
    if (type === "tasklist") {
      await dispatch(deleteTaskGroup(id));
      addToast("taskgroup deleted successfully.", {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(getTaskList());
    }
    if (type === "Flashcards") {
      await dispatch(deleteFlashcardGroup(id));
      addToast("flashcard deleted successfully.", {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(getFlashcardGroupList());
    }
    if (type === "Journals") {
      await dispatch(deleteJournalGroup(id));
      addToast("flashcard deleted successfully.", {
        appearance: "error",
        autoDismiss: true,
      });
      dispatch(getJournalGroupList());
    }
  };

  return (
    <div className="w-6/6 mx-auto h-full">
      <div
        style={{ background: `${color}` }}
        className="rounded-2xl p-2 m-3 h-full flex flex-col justify-between break-words"
      >
        <div className="flex justify-between">
          <div>
            <h1 className="ml-4 pt-3 font-sans text-black text-2xl font-bold">
              {title}
            </h1>
            <h1 className="ml-4 mb-4 font-sans text-black text-l font-medium">
              {description}
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
        <div className="flex justify-between">
          <div className="my-auto mt-4">
            <Link to={`/${type}/${id}`}>
              <button
                onClick={Open}
                className="bg-black text-white font-bold py-1 px-4 rounded ml-4 hover:bg-gray-700 transition duration-500"
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <div
                style={{ borderRadius: "100px" }}
                onClick={() => setEditIsOpen(true)}
                className="ml-2 flex items-center mr-1 w-10 h-10 cursor-pointer bg-black mt-3 mr-3 hover:bg-yellow-600 transition duration-500"
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
                          {type === "Tasks" && "Edit Task Group"}
                          {type === "Flashcards" && "Edit Flashcard Group"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <input
                            maxLength={50}
                            type="text"
                            placeholder="Remainder Title"
                            onChange={(e) => settaskGroupTitle(e.target.value)}
                            value={taskGroupTitle}
                            className="px-3 py-2 mt-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          />
                          <div className="flex justify-end">
                            <p style={{ fontSize: "0.8rem" }}>
                              {taskGroupTitle.length}/50
                            </p>
                          </div>
                          <input
                            type="text"
                            placeholder="Description"
                            maxLength={150}
                            onChange={(e) =>
                              settaskGroupDescription(e.target.value)
                            }
                            value={taskGroupDescription}
                            className="px-3 py-2 mt-3  border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                          />
                          <div className="flex justify-end">
                            <p style={{ fontSize: "0.8rem" }}>
                              {taskGroupDescription.length}/150
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => {
                              closeEditModal();
                              editTaskGroupDetailsHandler();
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
                            Are you sure you want to delete this remainder?
                          </Dialog.Description>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => {
                              closeDeleteModal();
                              deleteTaskGroupHandler();
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
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
  );
};

export default TaskGroupCard;
