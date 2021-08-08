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
  journalTitle: string;
  Description: string;
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
  const [IsOpenJournal, setIsOpenJournal] = useState("");
  const [SelectedJournalData, setSelectedJournalData] = useState<
    any | undefined
  >({});

  useEffect(() => {
    if (IsOpenJournal !== "") {
      const journalId = IsOpenJournal;

      const groupdata = journals.find(
        (journal) => journal.journalId === journalId
      );
      setSelectedJournalData(groupdata);
    }
  });

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
            //   onClick={openModal}
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500"
          >
            New
          </button>
          <button
            onClick={() =>
              IsOpenJournal !== "" ? setIsOpenJournal("") : Back()
            }
            className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-red-600 transition duration-500"
          >
            Back
          </button>
        </div>
      </div>
      <div className="mx-auto px-10 py-5 w-full grid grid-cols-2 overflow-y-auto">
        {journals &&
          IsOpenJournal === "" &&
          journals.map((journal) => {
            return (
              <div className="w-5/6 mx-auto my-3">
                <JournalCard
                  selectJournal={() => setIsOpenJournal(journal.journalId)}
                  journals={journal}
                  color="#F0A177"
                />
              </div>
            );
          })}
      </div>
      {SelectedJournalData && IsOpenJournal !== "" && (
        <Journal
          title={SelectedJournalData.journalTitle}
          description={SelectedJournalData.Description}
          date="12/12/1998"
          ans1={SelectedJournalData.ans1}
          ans2={SelectedJournalData.ans2}
          ans3={SelectedJournalData.ans3}
          ans4={SelectedJournalData.ans4}
        />
      )}
    </>
  );
};

export default JournalList;
