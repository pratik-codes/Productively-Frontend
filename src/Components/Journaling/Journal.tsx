import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  addJournal,
  editJournal,
  getJournalGroupList,
} from "../../Redux/Actions/JournalActions";

interface JournalProps {
  journalGroupId: string;
  journalId: string;
  title: string;
  description: string;
  date: Date | undefined;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  type: string;
  close: any;
  back: any;
}

const Journal: React.FC<JournalProps> = ({
  journalGroupId,
  journalId,
  title,
  description,
  date,
  ans1,
  ans2,
  ans3,
  ans4,
  type,
  close,
  back,
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [JournalDate, setJournalDate] = useState<Date>();
  const [Answer1, setAnswer1] = useState("");
  const [Answer2, setAnswer2] = useState("");
  const [Answer3, setAnswer3] = useState("");
  const [Answer4, setAnswer4] = useState("");
  const [Answer1TextBoxLen, setAnswer1TextBoxLen] = useState(3);
  const [Answer2TextBoxLen, setAnswer2TextBoxLen] = useState(3);
  const [Answer3TextBoxLen, setAnswer3TextBoxLen] = useState(3);
  const [Answer4TextBoxLen, setAnswer4TextBoxLen] = useState(3);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    if (type === "edit") {
      setTitle(title);
      setDescription(description);
      setJournalDate(date);
      setAnswer1(ans1);
      setAnswer2(ans2);
      setAnswer3(ans3);
      setAnswer4(ans4);
    }
  }, [title, description, date, ans1, ans2, ans3, ans4]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const submitHandler = async () => {
    if (type === "edit") {
      if (Title || Description || JournalDate) {
        console.log(
          "Onclick form state",
          Title,
          Description,
          JournalDate,
          Answer1,
          Answer2,
          Answer3,
          Answer4
        );
        await dispatch(
          editJournal(
            journalGroupId,
            journalId,
            Title,
            Description,
            JournalDate,
            Answer1,
            Answer2,
            Answer3,
            Answer4
          )
        );
        addToast("Journal  edited", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(getJournalGroupList());
        closeModal();
        close();
        back();
      } else {
        addToast("title, description and date cant be empty", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else {
      if (Title || Description || JournalDate) {
        console.log("add");
        await dispatch(
          addJournal(
            Title,
            Description,
            JournalDate,
            Answer1,
            Answer2,
            Answer3,
            Answer4,
            journalGroupId
          )
        );
        await addToast("Journal  addded", {
          appearance: "success",
          autoDismiss: true,
        });
        dispatch(getJournalGroupList());
        closeModal();
        close();
        back();
      } else {
        addToast("title, description and date cant be empty", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  useEffect(() => {
    if (Answer1) {
      Answer1.split(/\r\n|\r|\n/).length <= 4
        ? setAnswer1TextBoxLen(4)
        : setAnswer1TextBoxLen(Answer1.split(/\r\n|\r|\n/).length);
      Answer2.split(/\r\n|\r|\n/).length <= 4
        ? setAnswer2TextBoxLen(4)
        : setAnswer2TextBoxLen(Answer2.split(/\r\n|\r|\n/).length);
      Answer3.split(/\r\n|\r|\n/).length <= 4
        ? setAnswer3TextBoxLen(4)
        : setAnswer3TextBoxLen(Answer3.split(/\r\n|\r|\n/).length);
      Answer4.split(/\r\n|\r|\n/).length <= 4
        ? setAnswer4TextBoxLen(4)
        : setAnswer4TextBoxLen(Answer4.split(/\r\n|\r|\n/).length);
    }
  });

  return (
    <div
      style={{ background: "#B095F6" }}
      className="w-6/6 2xl:w-4/6 xl:w-4/6 lg:w-4/6 md:w-4/6 py-5 mx-auto shadow-2xl rounded-2xl p-10 mb-5"
    >
      <p className="font-bold text-black pt-3">Title</p>
      <input
        style={{ background: "#cabded" }}
        maxLength={100}
        type="text"
        placeholder="Add Title"
        onChange={(e) => setTitle(e.target.value)}
        value={Title}
        className="p-2 mt-2 border-2  border-transparent placeholder-blueGray-300 text-blueGray-600 relative rounded text-base border-0  outline-none focus:outline-none focus:ring ring-purple-600 ring-purple-600 w-full"
      />
      <p className="font-bold text-black pt-5">Description</p>
      <input
        maxLength={100}
        type="text"
        placeholder="Add Description"
        style={{ background: "#cabded" }}
        onChange={(e) => setDescription(e.target.value)}
        value={Description}
        className=" p-2 mt-2 border-2  border-transparent placeholder-blueGray-300 text-blueGray-600 relative rounded text-base border-0 outline-none focus:outline-none focus:ring ring-purple-600 w-full"
      />
      <div className="w-full mt-6 mb-1 border-gray-400 border-opacity-50">
        {console.log(JournalDate)}
        <DatePickerComponent
          id="datepicker"
          placeholder="Select Date"
          min={new Date()}
          value={JournalDate}
          onChange={(e: any) => setJournalDate(e.target.value)}
        />
      </div>
      <p className="font-bold text-black pt-5">How was your day today ?</p>
      <textarea
        className=" p-2 mt-2 border-2  border-transparent placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 outline-none focus:outline-none focus:ring ring-purple-600 w-full"
        rows={Answer1TextBoxLen}
        onChange={(e) => setAnswer1(e.target.value)}
        placeholder="Enter Answer."
        value={Answer1}
        style={{ background: "#cabded" }}
      ></textarea>
      <p className="font-bold text-black pt-10">
        What did you learn today and what is the thing that you are happy about
        today?
      </p>
      <textarea
        className=" p-2 mt-2 border-2 border-transparent border-opacity-0  placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 outline-none focus:outline-none focus:ring ring-purple-600 w-full"
        rows={Answer2TextBoxLen}
        onChange={(e) => setAnswer2(e.target.value)}
        placeholder="Enter Answer."
        style={{ background: "#cabded" }}
        value={Answer2}
      ></textarea>
      <p className="font-bold text-black pt-10">
        What do you expect from tomorrow?
      </p>
      <textarea
        className=" p-2 mt-2 border-2  border-transparent placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 outline-none focus:outline-none focus:ring ring-purple-600 w-full"
        rows={Answer3TextBoxLen}
        onChange={(e) => setAnswer3(e.target.value)}
        placeholder="Enter Answer."
        style={{ background: "#cabded" }}
        value={Answer3}
      ></textarea>
      <p className="font-bold text-black pt-10">
        What are you most grateful for today?
      </p>
      <textarea
        className=" p-2 mt-2 border-2  border-transparent placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 outline-none focus:outline-none focus:ring ring-purple-600 w-full"
        rows={Answer4TextBoxLen}
        onChange={(e) => setAnswer4(e.target.value)}
        placeholder="Enter Answer."
        style={{ background: "#cabded" }}
        value={Answer4}
      ></textarea>
      <button
        onClick={() => {
          submitHandler();
        }}
        className="bg-black text-white font-bold h-10 mb-4 py-1 px-4 rounded mr-4 hover:bg-purple- transition duration-500 my-4"
      >
        {type === "edit" ? "Edit" : "Add"}
      </button>
    </div>
  );
};

export default Journal;
