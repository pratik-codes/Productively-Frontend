import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TodoCardComponent from "./TodoCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../Redux/Store";
import {
  addPriority,
  getPriority,
  multipleDeletePriority,
} from "../../Redux/Actions/priorityActions";
import { useToasts } from "react-toast-notifications";
import { PrioritiesReduxState } from "../../Interfaces/Interfaces";
import {
  addPriorityReducers,
  PriorityData,
} from "../../Redux/Reducers/priorityReducers";
import Loader from "../loader";

const TodoCard: React.FC = () => {
  const [addPriorities, setAddPriorities] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [multipleDelete, setMultipleDelete] = useState(false);
  const [cardsToDelete, setCardsToDelete] = useState<string[]>([]);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const Priorities: PrioritiesReduxState = useSelector(
    (state: RootStore) => state.priorities
  );

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

  useEffect(() => {
    if (!Priorities.data) dispatch(getPriority());
  }, []);

  const addPriorityHandler = async () => {
    if (addPriorities) {
      await dispatch(addPriority(addPriorities));
      addToast("priority added successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getPriority());
    } else {
      addToast("Priority cant be empty.", {
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
      await dispatch(multipleDeletePriority(remainderIds));
      addToast("Reminders deleted successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      setCardsToDelete([]);
      dispatch(getPriority());
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className=" h-6/6 m-5   ">
        <br />
        <div className="flex justify-between">
          <h1 className="text-2xl font-sans font-bold text-blue-800 ml-4 mb-4">
            Priorities 🌟
          </h1>
          <div className="flex">
            <button
              onClick={openModal}
              className="bg-black text-white font-bold mb-4 py-1 px-4 rounded h-8 mx-2"
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
            {multipleDelete ? (
              <div>
                <button
                  onClick={() => {
                    openDeleteModal();
                  }}
                  className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-2 h-8"
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
                    setCardsToDelete([]);
                  }}
                  className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 h-8"
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
                className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 h-8"
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
        </div>
        <br />
        {/* <div
          className="flex items-center max-w-md mx-auto bg-white rounded-full shadow-md border-2"
          x-data="{ search: '' }"
        >
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none"
              placeholder="search"
              x-model="search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`flex items-center justify-center w-12 h-12 text-gray-100 rounded-full ${
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
        </div> */}
        {/* <br /> */}
        <div className="m-4">
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
                      Add Priority
                    </Dialog.Title>
                    <div className="mt-2">
                      <input
                        type="text"
                        maxLength={50}
                        placeholder="Priority Description"
                        onChange={(e) => setAddPriorities(e.target.value)}
                        className="px-3 py-2  my-3 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                      />
                    </div>
                    <div className="flex justify-end">
                      <p style={{ fontSize: "0.8rem" }}>
                        {addPriorities.length}/50
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          closeModal();
                          addPriorityHandler();
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
                      Delete Multiple Priority
                    </Dialog.Title>
                    <div className="mt-2">
                      <Dialog.Description>
                        Are you sure you want to delete all Priorities?
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
          {!Priorities.data ? (
            <Loader />
          ) : Priorities.data.length === 0 ? (
            <div className="">
              <br />
              <h1 className="text-l ml-5 font-bold">No priorities</h1>
              <br />
            </div>
          ) : (
            Priorities.data
              .filter((value) => {
                if (searchInput === "") {
                  return value;
                } else if (
                  value.priority
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase()) ||
                  value.priority
                    .toLocaleLowerCase()
                    .includes(searchInput.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              .map((task: PriorityData) => {
                return (
                  <div className="">
                    <TodoCardComponent
                      id={task._id}
                      task={task.priority}
                      multipleDelete={multipleDelete}
                      addMultipleDelete={() =>
                        addCardsToAddOrDelete(task._id, true)
                      }
                      removeMultipleDelete={() =>
                        addCardsToAddOrDelete(task._id, false)
                      }
                    />
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
