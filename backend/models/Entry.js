import mongoose from "mongoose"

const entrySchema = new mongoose.Schema(
  {
    dateTime: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    photo: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

// Add index on dateTime for sorting

entrySchema.index({ dateTime: -1 })

const Entry = mongoose.model("Entry", entrySchema)

export default Entry