const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    ThoughtText: {
      type: String,
      required: true,
      len: [1, 280],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (createdAt) =>
        moment(createdAt).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
      type: String,
      required: true,
      ref: "user",
    },
    reactions: [reactionSchema],
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

