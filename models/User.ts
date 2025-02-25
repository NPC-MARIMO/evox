import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 1000, // Starting balance
  },
})

export default mongoose.models.User || mongoose.model("User", UserSchema)

