import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["deposit", "transfer"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema)

