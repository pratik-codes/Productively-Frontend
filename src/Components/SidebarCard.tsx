import React from "react";

interface SideBarCardProps {
  title: string;
  icon: any;
  activeTab: string;
  margin: number;
  showTitle: boolean;
}

const SidebarCard: React.FC<SideBarCardProps> = ({
  title,
  icon,
  activeTab,
  margin,
  showTitle,
}) => {
  return (
    <div
      style={{
        background: activeTab === title ? "#DDD6FE" : "#E5E7EB",
        marginTop: `${margin}rem`,
        marginBottom: `${margin}rem`,
      }}
      className="flex mx-auto mx-5 justify-center bg-gray-200 rounded-md h-11 w-9/12 cursor-pointer hover:bg-gray-300 transition duration-500 mx-auto "
    >
      <div className="flex mx-auto justify-center items-center ">
        <div
          style={{ marginTop: `${margin !== 2 ? 0.8 : -0.5}rem` }}
          className="mx-auto flex justify-center align-middle mx-1 2xl:mx-2 xl:mx-2 l:mx-2 md:mx-2 w-10 h-10  md:h-5 md:h-5 text-gray-700"
        >
          {icon}
        </div>
      </div>
      {showTitle === true && (
        <div className="w-8/12 flex items-center justify-start align-middle">
          <h3 className=" font-sans text-sm 2xl:text-md xl:text-md l:text-md md:text-md  font-bold text-gray-700">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default SidebarCard;
