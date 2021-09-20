import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import JournalCard, { journal } from "../../Components/Journaling/JournalCards";
import JournalList from "../../Components/Journaling/JournalList";
import Loader from "../../Components/loader";
import TaskGroupCard from "../../Components/TaskList/TaskGroupCard";
import TaskListView, {
  TaskListViewProps,
} from "../../Components/TaskList/TaskListView";
import { JournalReduxState } from "../../Interfaces/Interfaces";
import { JournalingGroupData } from "../../MockData/JournalingData";
import {
  addJournalGroup,
  deleteMultipleJournalGroupHandler,
  getJournalGroupList,
} from "../../Redux/Actions/JournalActions";
import { RootStore } from "../../Redux/Store";

const Journaling = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [JournalTitle, setJournalTitle] = useState("");
  const [JournalDescription, setJournalDescription] = useState("");
  const [journalListIsOpen, setJournalListIsOpen] = useState("");
  const [journalListData, setJournalListData] = useState<any | undefined>([]);
  const [multipleDelete, setMultipleDelete] = useState(false);
  const [cardsToDelete, setCardsToDelete] = useState<string[]>([]);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const JournalGroups: JournalReduxState = useSelector(
    (state: RootStore) => state.journalGroups
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

  const addJournal = async () => {
    if (JournalTitle || JournalDescription) {
      await dispatch(addJournalGroup(JournalTitle, JournalDescription));
      addToast("Journal Group addded", {
        appearance: "success",
        autoDismiss: true,
      });
      dispatch(getJournalGroupList());
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
      await dispatch(deleteMultipleJournalGroupHandler(remainderIds));
      addToast("Reminders deleted successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      setCardsToDelete([]);
      dispatch(getJournalGroupList());
    }
  };

  useEffect(() => {
    if (journalListIsOpen !== "") {
      const journalId = journalListIsOpen;

      const groupdata = JournalGroups.data.find(
        (journal) => journal._id === journalId
      );
      setJournalListData(groupdata);
    }
  }, [journalListIsOpen]);

  useEffect(() => {
    if (!JournalGroups.data) dispatch(getJournalGroupList());
  }, []);

  return (
    <div className="h-full overflow-y-auto">
      {journalListIsOpen !== "" && (
        <JournalList
          GroupId={journalListData._id}
          title={journalListData.groupName}
          description={journalListData.groupDescription}
          journals={journalListData.Journals}
          color="#556052"
          Back={() => setJournalListIsOpen("")}
        />
      )}
      {journalListIsOpen === "" && (
        <div className="">
          <div className="flex justify-between w-6/6 pt-10 mx-10 mt-10">
            <h1
              style={{ color: "#6EB448" }}
              className="text-2xl font-sans font-bold  ml-4 mb-4"
            >
              Journal Groups 💭
            </h1>
            <div className="flex">
              <button
                onClick={openModal}
                className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500"
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
                        Add Journal Group
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          type="text"
                          maxLength={50}
                          value={JournalTitle}
                          onChange={(e) => setJournalTitle(e.target.value)}
                          placeholder="Flashcard Title"
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {JournalTitle.length}/50
                          </p>
                        </div>
                        <input
                          type="text"
                          placeholder="Description"
                          maxLength={150}
                          onChange={(e) =>
                            setJournalDescription(e.target.value)
                          }
                          value={JournalDescription}
                          className="px-3 py-2 mt-3 mb-2 border-2  border-opacity-50  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="flex justify-end">
                          <p style={{ fontSize: "0.8rem" }}>
                            {JournalDescription.length}/150
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => {
                            addJournal();
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
                        Delete Multiple JournalGroups
                      </Dialog.Title>
                      <div className="mt-2">
                        <Dialog.Description>
                          Are you sure you want to delete these Journal Groups?
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

          <div
            className="flex items-center max-w-md mx-auto bg-white rounded-md shadow-md"
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

          <div className="py-10 px-20 h-full w-full grid grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xm:grid-cols-1 gap-2  overflow-y-auto">
            {!JournalGroups.data ? (
              <Loader />
            ) : JournalGroups.data.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-5 ">No Journal Groups</h1>
                <br />
              </div>
            ) : (
              JournalGroups.data
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
                .map((journalGroup) => {
                  return (
                    <div style={{ marginBottom: "2rem" }}>
                      <TaskGroupCard
                        id={journalGroup._id}
                        title={journalGroup.groupName}
                        description={journalGroup.groupDescription}
                        color="#E6EE96"
                        Open={() => setJournalListIsOpen(journalGroup._id)}
                        type="Journals"
                        multipleDelete={multipleDelete}
                        addMultipleDelete={() =>
                          addCardsToAddOrDelete(journalGroup._id, true)
                        }
                        removeMultipleDelete={() =>
                          addCardsToAddOrDelete(journalGroup._id, false)
                        }
                      />
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journaling;
