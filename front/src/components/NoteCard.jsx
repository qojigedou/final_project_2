import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
  return (
    <Link to={`/note/${note._id}`}>
      <div>
        <div>
          <img
            className="object-cover w-full"
            src={note.videoThumbnail}
            alt=""
          />
        </div>
        <h1 className="border-solid border-2 border-black p-4 text-xl truncate font-bold block">
          {note.videoTitle}
        </h1>
      </div>
    </Link>
  );
};
export default NoteCard;
