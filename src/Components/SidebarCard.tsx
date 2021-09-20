import React from "react";

interface SideBarCardProps {
  title: string;
  imgSrc: string;
  activeTab: string;
}

const SidebarCard: React.FC<SideBarCardProps> = ({
  title,
  imgSrc,
  activeTab,
}) => {
  return (
    <div
      style={{ background: activeTab === title ? "#DDD6FE" : "#E5E7EB" }}
      className="flex mx-5 my-8 bg-gray-200 rounded-md h-11 w-9/12 cursor-pointer hover:bg-gray-300 transition duration-500"
    >
      <div className="flex items-center w-4/10">
        <img
          className="flex justify-center align-middle mx-4 w-7 h-7 text-gray-700"
          src={imgSrc}
          alt="logo"
        />
      </div>
      <div className="w-8/12 flex items-center justify-start align-middle">
        <h3 className=" font-sans text-md font-bold text-gray-700">{title}</h3>
      </div>
    </div>
  );
};

export default SidebarCard;
