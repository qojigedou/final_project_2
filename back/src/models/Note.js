import mongoose, { Schema } from "mongoose";

const notesSchema = mongoose.Schema({
  videoLink: {
    type: String,
    require: true,
  },
  videoTitle: {
    type: String,
    require: true,
  },
  videoThumbnail: {
    type: String,
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  noteContent: [
    {
      content: {
        type: String,
        require: true,
      },
      timestamp: {
        type: Number,
      },
    },
  ],
});
const Note = new mongoose.model("Note", notesSchema);
export default Note;
