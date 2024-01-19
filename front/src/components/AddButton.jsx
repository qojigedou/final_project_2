import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const AddButton = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (localStorage.getItem("user")) navigate("/add-note");
    else navigate("/login");
  };
  return (
    <button
      className="bg-gray-200 p-8 rounded-lg hover:bg-gray-300"
      onClick={handleOnClick}
    >
      <HiPlus className="text-5xl" />
    </button>
  );
};

export default AddButton;
