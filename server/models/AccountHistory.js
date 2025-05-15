const mongoose = require("mongoose")

const AccountHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["checking", "savings", "investment", "credit", "loan"],
    },
  },
  { timestamps: true },
)

// Create compound index for faster queries
AccountHistorySchema.index({ userId: 1, accountId: 1, date: -1 })

const AccountHistory = mongoose.model("AccountHistory", AccountHistorySchema)

module.exports = AccountHistory
