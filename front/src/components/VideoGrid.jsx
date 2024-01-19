import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

const VideoGrid = () => {
  const [videoStorage, setVideoStorage] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        "http://localhost:8080/api/notetube/note/mynotes",
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status == 200) {
        const videos = await response.json();
        setVideoStorage(videos);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 mt-3">
      {videoStorage.map((video, index) => (
        <NoteCard note={video} key={index} />
      ))}
    </div>
  );
};

export default VideoGrid;
