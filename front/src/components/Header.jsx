import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPopup from "./UserPopup";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    }
  });

  return (
    <nav>
      <div className="flex justify-between items-center py-12">
        <div className="">
          <Link to="/" className="text-6xl font-secondary">
            NoteTube
          </Link>
        </div>
        {isLoggedIn ? (
          <UserPopup setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <button
            className="text-xl py-3 px-5 border-2 border-solid border-black rounded-md hover:bg-black hover:text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
