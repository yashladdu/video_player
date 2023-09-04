import mongoose from "mongoose";

// Define the video chapter schema
const videoChapterSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  start: {
    type: Number,
    required: true
  },
  end: {
    type: Number,
    required: true
  }
});

// Define the video schema
const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    chapters: {
      type: [videoChapterSchema],
      default: []
    }
  },
  { timestamps: true }
);
export default mongoose.model("Video", VideoSchema);



/* tags: {
  type: [String],
  default: [],
},
likes: {
  type: [String],
  default: [],
},
dislikes: {
  type: [String],
  default: [],
}, */