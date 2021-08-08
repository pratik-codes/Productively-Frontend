import React, { useEffect, useState } from "react";
import JournalCard, { journal } from "../Components/Journaling/JournalCards";
import JournalList from "../Components/Journaling/JournalList";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import TaskListView, {
  TaskListViewProps,
} from "../Components/TaskList/TaskListView";
import { JournalingGroupData } from "../MockData/JournalingData";

const Journaling = () => {
  const [journalListIsOpen, setJournalListIsOpen] = useState("");
  const [journalListData, setJournalListData] = useState<any | undefined>([]);

  useEffect(() => {
    if (journalListIsOpen !== "") {
      const journalId = journalListIsOpen;

      const groupdata = JournalingGroupData.find(
        (journal) => journal.GroupId === journalId
      );
      setJournalListData(groupdata);
    }
  });

  return (
    <div className="h-full overflow-y-auto">
      {journalListIsOpen !== "" && (
        <JournalList
          GroupId={journalListData.GroupId}
          title={journalListData.title}
          description={journalListData.description}
          journals={journalListData.Journals}
          color="#556052"
          Back={() => setJournalListIsOpen("")}
        />
      )}
      {journalListIsOpen === "" && (
        <div className="">
          <div className="flex justify-between w-5/6 mx-auto pt-10 mt-10">
            <h1
              style={{ color: "#6EB448" }}
              className="text-2xl font-sans font-bold  ml-4 mb-4"
            >
              Journal Groups 💭
            </h1>
            <button className="bg-black text-white font-bold mb-4 py-1 px-4 rounded mr-4 hover:bg-purple-700 transition duration-500">
              New
            </button>
          </div>
          <div className="p-10 h-full w-full grid grid-cols-3 gap-2  overflow-y-auto">
            {JournalingGroupData.map((journalGroup) => {
              return (
                <div>
                  <TaskGroupCard
                    title={journalGroup.title}
                    description={journalGroup.description}
                    color="#E6EE96"
                    Open={() => setJournalListIsOpen(journalGroup.GroupId)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journaling;
