const { Schema, model } = require("mongoose");
const moment = require("moment");
const reactionSchema = require("./Reaction");

const opinionSchema = new Schema({
  opinionText: {
    type: String,
    required: true,
    len: [1, 280],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    get: (createdAtVal) =>
      moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
  },
  username: {
    type: String,
    required: true,
    ref: "user",
  },
  reactions: [reactionSchema],
});

const Opinion = model("opinion", opinionSchema);

module.exports = Opinion;

