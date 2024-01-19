"use client";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";

const UserPopup = ({ setIsLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={handleLogout}
    >
      <div className="w-[60px] h-[60px] flex justify-center items-center">
        <FaRegUser className="block text-4xl" />
      </div>

      <div
        className={`${
          isVisible ? "absolute" : "hidden"
        } left-0 top-0 flex h-full w-full items-center justify-center rounded-full bg-black opacity-80`}
      >
        <FiLogOut className="text-2xl text-white" />
      </div>
    </div>
  );
};

export default UserPopup;
