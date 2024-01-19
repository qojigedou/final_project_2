import AddButton from "../components/AddButton";
import VideoGrid from "../components/VideoGrid";
import logo from "../assets/img.jpg";

const Home = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <AddButton />
          <VideoGrid />
        </div>
      ) : (
        <div>
          <img className="w-3/5 mx-auto" src={logo} alt="Logo" />
          <h1 className="font-secondary font-bold text-4xl my-6 text-center block">
            Write notes about your favourite YouTube videos in a simple way
          </h1>
        </div>
      )}
    </div>
  );
};
export default Home;
