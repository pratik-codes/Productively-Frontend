import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-center">
      <div
        // style={{ background: "#08000f" }}
        className="bg-black w-screen m-8 h-96 rounded-2xl shadow-2xl h-full"
      >
        <div className="divide-y 2xl:divide-none xl:divide-none l:divide-none md:divide-none divide-light-blue-400 2xl:flex xl:flex md:flex">
          <div className="w-12/12 2xl:w-4/12 xl:w-4/12 md:w-4/12">
            <h1 className="text-white font-bold text-3xl font-sans ml-10  mt-12">
              Productively
            </h1>
            <p className="text-white font-sans ml-10 mt-3">
              Productivity app on steroids.
            </p>
          </div>
          <div className="mt-8 2xl:ml-2 xl:ml-2 md:ml-2 w-12/12 2xl:w-4/12 xl:w-4/12 md:w-4/12">
            <ul className="">
              <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300 ml-10">
                Join the community and contribute
              </li>
              <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300 ml-10">
                Github
              </li>
              <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300 ml-10">
                Linkedin
              </li>
            </ul>
          </div>
          <div className="mt-8 mb-8 w-12/12 2xl:w-4/12 xl:w-4/12 md:w-4/12">
            <ul>
              <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300 ml-10">
                Made with ❤️ in India.
              </li>
              <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300 ml-10">
                Email
              </li>
              <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300 ml-10">
                Phone
              </li>
              <li className="text-gray-100 hover:text-white cursor-pointer text-medium text-l m-3 duration-300 ml-10">
                Have an idea to discuss? <br />
                shoot a mail now!
              </li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Footer;
