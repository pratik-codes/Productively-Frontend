import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { deleteMultipleFlashcardsHandler } from "../../Redux/Actions/FlashcardActions";
import Journal from "./Journal";
import JournalCard from "./JournalCards";
import {
  deleteMultipleJournalsHandler,
  getJournalGroupList,
} from "../../Redux/Actions/JournalActions";

interface JournalCardComponentProps {
  GroupId: string;
  title: string;
  description: string;
  journals: journal[];
  color: string;
  Back: any;
}

export interface journal {
  journalId: string;
  journalName: string;
  journalDescription: string;
  journalDate: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
}

const JournalList: React.FC<JournalCardComponentProps | undefined> = ({
  GroupId,
  title,
  description,
  journals,
  color,
  Back,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [IsOpenJournal, setIsOpenJournal] = useState("");
  const [SelectedJournalData, setSelectedJournalData] = useState<
    any | undefined
  >({});
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

  useEffect(() => {
    if (IsOpenJournal !== "") {
      const journalId = IsOpenJournal;
      const groupdata = journals.find(
        (journal) => journal.journalId === journalId
      );
      setSelectedJournalData(groupdata);
    }
  });

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
      await dispatch(deleteMultipleJournalsHandler(GroupId, remainderIds));
      addToast("Reminders deleted successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
      setCardsToDelete([]);
      dispatch(getJournalGroupList());
      Back("");
    }
  };

  return (
    <>
      <div className="p-5 mx-auto pt-10 mt-10 2xl:p-10 xl:p-10 l:p-10 md:p-10 w-full">
        <div className="flex flex-col-reverse 2xl:flex-row xl:flex-row l:flex-row md:flex-row justify-between w-full">
          <div className="w-full 2xl:w-5/6 xl:w-5/6 l:w-5/6 md:w-5/6">
            <h1 className="text-xl 2xl:text-2xl xl:text-2xl l:text-2xl md:text-2xl font-sans font-bold text-blue-700 ml-4 mb-1">
              Journal Group: {title}
            </h1>
            <p className="text-xs font-sans w-3/6 text-black ml-4 mb-4">
              {description}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={openModal}
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
              className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4"
              onClick={() =>
                IsOpenJournal !== "" ? setIsOpenJournal("") : Back()
              }
            >
              Back
            </button>
          </div>
        </div>
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
                  Delete Multiple Journals
                </Dialog.Title>
                <div className="mt-2">
                  <Dialog.Description>
                    Are you sure you want to delete all the Journals?
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

      {journals && isOpen === false && IsOpenJournal === "" && (
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
      )}

      <div className="mx-auto w-full grid grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 overflow-y-auto">
        {journals &&
          isOpen === false &&
          IsOpenJournal === "" &&
          journals
            .filter((value) => {
              if (searchInput === "") {
                return value;
              } else if (
                value.journalName
                  .toLocaleLowerCase()
                  .includes(searchInput.toLocaleLowerCase()) ||
                value.journalDescription
                  .toLocaleLowerCase()
                  .includes(searchInput.toLocaleLowerCase())
              ) {
                return value;
              }
            })
            .map((journal) => {
              return (
                <div
                  style={{ marginBottom: "2rem" }}
                  className="w-5/6 mx-auto my-3"
                >
                  <JournalCard
                    selectJournal={() => setIsOpenJournal(journal.journalId)}
                    journalGroupId={GroupId}
                    journals={journal}
                    color="#CABDED"
                    back={Back}
                    multipleDelete={multipleDelete}
                    addMultipleDelete={() =>
                      addCardsToAddOrDelete(journal.journalId, true)
                    }
                    removeMultipleDelete={() =>
                      addCardsToAddOrDelete(journal.journalId, false)
                    }
                  />
                </div>
              );
            })}
        {journals && journals?.length === 0 && (
          <div className="">
            <br />
            <h1 className="text-l ml-5">No Journals</h1>
            <br />
          </div>
        )}
      </div>
      {isOpen === true && (
        <Journal
          journalGroupId={GroupId}
          journalId=""
          title=""
          description=""
          date={new Date()}
          ans1=""
          ans2=""
          ans3=""
          ans4=""
          type="add"
          close={closeModal}
          back={Back}
        />
      )}
      {SelectedJournalData && IsOpenJournal !== "" && (
        <Journal
          journalGroupId={GroupId}
          journalId={SelectedJournalData.journalId}
          title={SelectedJournalData.journalName}
          description={SelectedJournalData.journalDescription}
          date={SelectedJournalData.journalDate}
          ans1={SelectedJournalData.ans1}
          ans2={SelectedJournalData.ans2}
          ans3={SelectedJournalData.ans3}
          ans4={SelectedJournalData.ans4}
          type="edit"
          close={closeModal}
          back={Back}
        />
      )}
    </>
  );
};

export default JournalList;
