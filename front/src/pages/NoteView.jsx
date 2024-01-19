import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoteView = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [newNote, setNewNote] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const response = await fetch(
        `http://localhost:8080/api/notetube/note/details/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status == 200) {
        const noteDetails = await response.json();
        setNote(noteDetails);
        const urlParams = new URL(noteDetails.videoLink);
        setVideoId(urlParams.searchParams.get("v"));
      }
    };
    fetchVideoDetails();
  }, []);

  const handleNoteAdd = async (event) => {
    if (event.key != "Enter") return;
    const response = await fetch(
      `http://localhost:8080/api/notetube/note/mynotes/newnote/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ content: newNote }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status == 200) {
      const updated = await response.json();

      setNote((prev) => {
        return {
          ...prev,
          noteContent: updated.noteContent,
        };
      });
      setNewNote("");
    }
  };
  const handleNoteDelete = async (index) => {
    const selectedNote = note.noteContent[index];

    const response = await fetch(
      `http://localhost:8080/api/notetube/note/mynotes/newnote/${id}/${selectedNote._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    setNote((prev) => {
      return {
        ...prev,
        noteContent: prev.noteContent.filter(
          (note) => note._id != selectedNote._id
        ),
      };
    });
  };
  const handleVideoDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/api/notetube/note/mynotes/newnote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status == 200) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="h-[600px]">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; 
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share"
          allowfullscreen
        ></iframe>
      </div>
      <input
        type="text"
        className="p-4"
        placeholder="Add a new note and press ENTER"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyDown={handleNoteAdd}
      />
      <div className="">
        <h1 className="font-bold text-3xl">{note && note.videoTitle}</h1>
        <p className="font-bold text-2xl mt-2">Your Notes:</p>
        <ul className="list-disc">
          {note &&
            note.noteContent.length > 0 &&
            note.noteContent.map((note, index) => {
              return (
                <li
                  className="text-2xl mt-4 whitespace-pre-line flex justify-between"
                  key={index}
                >
                  <div>{note.content}</div>
                  <div>
                    <button
                      className="p-4 bg-red-500 text-white"
                      onClick={() => handleNoteDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <button
        className="bg-red-500 p-8 text-white my-10"
        onClick={handleVideoDelete}
      >
        Delete the note
      </button>
    </div>
  );
};

export default NoteView;
