import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

export const CATEGORIES = [
  "Fair copy & handwriting",
  "Practical files",
  "Notes",
  "Project guidance",
  "Report & thesis editing",
  "PPT & design",
  "Typing & formatting",
  "Printing & binding",
];

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    college: { type: String, default: "" },
    city: { type: String, default: "" },
    bio: { type: String, default: "" },
    isSeller: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ServiceSchema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: CATEGORIES, required: true, index: true },
    price: { type: Number, required: true, min: 1 },
    unit: { type: String, default: "per job" }, // e.g. per page, per job
    turnaroundDays: { type: Number, default: 3, min: 1 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const OfferSchema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true, min: 1 },
    days: { type: Number, default: 3, min: 1 },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

const RequestSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: CATEGORIES, required: true, index: true },
    budget: { type: Number, default: 0 },
    deadline: { type: Date },
    status: { type: String, enum: ["open", "assigned", "closed"], default: "open", index: true },
    offers: [OfferSchema],
  },
  { timestamps: true }
);

const MessageSchema = new Schema(
  { from: { type: Schema.Types.ObjectId, ref: "User" }, text: String, at: { type: Date, default: Date.now } },
  { _id: false }
);

// Order status flow:
// pending_payment -> paid (held by platform) -> delivered -> completed (seller paid out)
// disputed / cancelled possible along the way.
const OrderSchema = new Schema(
  {
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    commission: { type: Number, required: true },
    sellerPayout: { type: Number, required: true },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["pending_payment", "paid", "delivered", "completed", "disputed", "cancelled"],
      default: "pending_payment",
      index: true,
    },
    deliveryNote: { type: String, default: "" },
    deliveryLink: { type: String, default: "" },
    paymentRef: { type: String, default: "" }, // Razorpay payment id goes here
    review: { rating: { type: Number, min: 1, max: 5 }, text: String },
    messages: [MessageSchema],
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    request: { type: Schema.Types.ObjectId, ref: "Request" },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
export const Service = models.Service || model("Service", ServiceSchema);
export const Request = models.Request || model("Request", RequestSchema);
export const Order = models.Order || model("Order", OrderSchema);
