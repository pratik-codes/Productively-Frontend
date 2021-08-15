import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import JournalCard, { journal } from "../Components/Journaling/JournalCards";
import JournalList from "../Components/Journaling/JournalList";
import Loader from "../Components/loader";
import TaskGroupCard from "../Components/TaskList/TaskGroupCard";
import TaskListView, {
  TaskListViewProps,
} from "../Components/TaskList/TaskListView";
import { JournalReduxState } from "../Interfaces/Interfaces";
import { JournalingGroupData } from "../MockData/JournalingData";
import { getJournalGroupList } from "../Redux/Actions/JournalActions";
import { RootStore } from "../Redux/Store";

const Journaling = () => {
  const [journalListIsOpen, setJournalListIsOpen] = useState("");
  const [journalListData, setJournalListData] = useState<any | undefined>([]);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const JournalGroups: JournalReduxState = useSelector(
    (state: RootStore) => state.journalGroups
  );

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
  }, [JournalGroups.data]);

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
            {!JournalGroups.data ? (
              <Loader />
            ) : JournalGroups.data.length === 0 ? (
              <div className="">
                <br />
                <h1 className="text-l ml-5 ">No upcoming remainders</h1>
                <br />
              </div>
            ) : (
              JournalGroups.data.map((journalGroup) => {
                return (
                  <div style={{ marginBottom: "2rem" }}>
                    <TaskGroupCard
                      id="this will change later"
                      title={journalGroup.groupName}
                      description={journalGroup.groupDescription}
                      color="#E6EE96"
                      Open={() => setJournalListIsOpen(journalGroup._id)}
                      type="Journals"
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
