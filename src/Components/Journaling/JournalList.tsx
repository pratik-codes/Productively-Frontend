import React, { useEffect, useState } from "react";
import Journal from "./Journal";
import JournalCard from "./JournalCards";

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

  return (
    <>
      <div className="p-10 mx-auto pt-10 mt-10">
        <div className="flex justify-between">
          <div className="w-5/6">
            <h1 className="text-2xl font-sans text-purple-600 font-bold ml-4 mb-1">
              Journal Group: {title}
            </h1>
            <p className="text-xs font-sans w-3/6 text-black ml-4 mb-4">
              {description}
            </p>
          </div>

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
            onClick={() =>
              IsOpenJournal !== "" ? setIsOpenJournal("") : Back()
            }
            className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500 "
          >
            Back
          </button>
        </div>
      </div>
      <div className="mx-auto px-10 py-5 w-full grid grid-cols-2 overflow-y-auto">
        {journals &&
          isOpen === false &&
          IsOpenJournal === "" &&
          journals.map((journal) => {
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
