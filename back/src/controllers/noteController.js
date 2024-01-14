import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";
import mongoose from "mongoose";

// @desc Get notes
// @route GET /api/notes
// @accesss Private
const getNotes = asyncHandler(async (req, res) => {
  const { _id: id } = req.user;
  if (!id) {
    res.status(400);
    throw new Error("No userId!");
  }
  const notes = await Note.find({ author: id });
  console.log(notes);
  res.status(200).json({ message: "Get notes" });
});

// @desc Set note
// @route POST /api/notes
// @accesss Private
const setNote = asyncHandler(async (req, res) => {
  const { videoLink } = req.body;
  const { _id: id } = req.user;

  if (!req.body.videoLink) {
    res.status(400);
    throw new Error("Please add a link to a video");
  }

  try {
    const videoRequestLink = `https://www.youtube.com/oembed?url=${videoLink}&format=json`;
    const videoDetailsResponse = await fetch(videoRequestLink);
    if (videoDetailsResponse.status != 200) {
      throw new Error("Video not found");
    }
    const videoDetails = await videoDetailsResponse.json();

    const dbNote = await Note.create({
      videoLink,
      videoTitle: videoDetails.title,
      videoThumbnail: videoDetails.thumbnail_url,
      author: id,
    });
    res.status(200).json(dbNote);
  } catch (error) {
    if (
      error instanceof mongoose.Error.CastError ||
      error instanceof mongoose.Error.ValidationError ||
      error instanceof mongo.MongoServerError
    ) {
      res.status(400);
      if (error.name == "MongoServerError" && error.code == 11000) {
        throw new Error("User with provided email already exists");
      }
      throw new Error(error.message);
    } else {
      res.status(500);
      console.log(error);
      throw new Error(
        "It's not your fault, it's just a server has some problems"
      );
    }
  }
});

const setNewNote = asyncHandler(async (req, res) => {
  const { content, timestamp } = req.body;
  const { _id: id } = req.user;
  const noteId = req.params.id;
  if (!noteId) {
    res.status(400);
    throw new Error("No such note");
  }
  if (!content) {
    res.status(400);
    throw new Error("No content provided");
  }
  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId },
    { $push: { noteContent: { content, timestamp } } },
    { new: true }
  );
  console.log(updatedNote);
  res.json(updatedNote);
});

// @desc Update notes
// @route PUT /api/notes/:id
// @accesss Private
const updateNote = asyncHandler(async (req, res) => {
  const { mainId, childId } = req.params;
  const contentReq = req.body.content;
  const timestampReq = req.body.timestamp;
  console.log({ mainId, childId });
  const updatedNote = await Note.findOneAndUpdate(
    { _id: mainId, noteContent: { $elemMatch: { _id: childId } } },
    {
      $set: {
        "noteContent.$.content": contentReq,
        "noteContent.$.timestamp": timestampReq,
      },
    },
    { new: true }
  );
});

// @desc Delete notes
// @route DELETE /api/notes/:id
// @accesss Private
const deleteNote = asyncHandler(async (req, res) => {
  const { mainId, childId } = req.params;
  const contentReq = req.body.content;
  const timestampReq = req.body.timestamp;
  console.log({ mainId, childId });
  const updatedNote = await Note.findOneAndUpdate(
    { _id: mainId, noteContent: { $elemMatch: { _id: childId } } },
    {
      $pull: {
        noteContent: {
          _id: {
            $in: [new mongoose.Types.ObjectId(childId)],
          },
        },
      },
    },
    { new: true }
  );
});

const deleteFullNote = asyncHandler(async (req, res) => {
  const { mainId } = req.params;
  await Note.findByIdAndDelete(mainId);
});

export {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
  setNewNote,
  deleteFullNote,
};
