import React from "react";

interface SideBarCardProps {
  title: string;
  icon: any;
  activeTab: string;
  margin: number;
}

const SidebarCard: React.FC<SideBarCardProps> = ({
  title,
  icon,
  activeTab,
  margin,
}) => {
  return (
    <div
      style={{
        background: activeTab === title ? "#DDD6FE" : "#E5E7EB",
        marginTop: `${margin}rem`,
        marginBottom: `${margin}rem`,
      }}
      className="flex mx-5  bg-gray-200 rounded-md h-11 w-9/12 cursor-pointer hover:bg-gray-300 transition duration-500"
    >
      <div className="flex items-center w-4/10">
        <div
          style={{ marginTop: `${margin !== 2 ? 0.8 : -0.5}rem` }}
          className="flex justify-center align-middle mx-2 2xl:mx-4 xl:mx-4 l:mx-4 md:mx-4 w-10 h-10  md:h-5 md:h-5  text-gray-700"
        >
          {icon}
        </div>
      </div>
      <div className="w-8/12 flex items-center justify-start align-middle">
        <h3 className=" font-sans text-sm 2xl:text-md xl:text-md l:text-md md:text-md  font-bold text-gray-700">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SidebarCard;
