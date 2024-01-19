import { useState } from "react";
import "./../styles/add_note.css";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const [videoLink, setVideolink] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/notetube/note", {
      method: "POST",
      body: JSON.stringify({ videoLink, initialNote: notes }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status == 201) {
      navigate("/");
    } else {
      setIsError(true);
    }
  };

  return (
    <div>
      <form className="flex flex-col w-2/5 mx-auto gap-2">
        <label htmlFor="link">Video link</label>
        <input
          type="text"
          name="link"
          id="link"
          value={videoLink}
          onChange={(e) => setVideolink(e.target.value)}
        />
        {isError && videoLink.length < 5 && (
          <p className="text-red-400">invalid videolink</p>
        )}
        <label htmlFor="notes">Notes text</label>
        <textarea
          name="notes"
          id="notes"
          cols="30"
          rows="10"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        {isError && notes.length < 1 && (
          <p className="text-red-400">invalid notes length</p>
        )}
        <button
          className="hover:bg-black hover:text-white border-2 border-solid border-black p-2 w-1/2 mx-auto mt-6"
          onClick={handleAddNote}
        >
          Create note
        </button>
      </form>
    </div>
  );
};

export default AddPage;
