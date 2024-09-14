import { model, models, Schema } from "mongoose";

const transactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  transactionName: {
    type: String,
    required: true,
  },
  transactionCategory: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: String,
    required: true,
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
  transactionRecurring: {
    type: Boolean,
    required: true,
  },
});

const transactionModel = models.transactions || model("transactions", transactionSchema);
export default transactionModel;
