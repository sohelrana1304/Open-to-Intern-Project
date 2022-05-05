const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    mobile: {
      type: Number,
      unique: true,
      trim: true,
      required: true,
    },
    collegeId: {
      type: ObjectId,
      trim:true,
      ref: "college", //refred college collection
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("intern", internSchema);
