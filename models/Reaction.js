const { Schema, Types } = require("mongoose");
const moment = require("moment");
const reactionSchema = new Schema(
    // Custom id to avoid confusion to parent id
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            len: [1, 280],
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) =>
            moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        },
        {
        toJSON: {
            getters: true,
        },
        id: false,
        }
    );

    module.exports = reactionSchema;