const { Schema, model } = require("mongoose");

// Defined user schema:
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Friends Count 
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create user model:

const User = model("user", userSchema);

module.exports = User;