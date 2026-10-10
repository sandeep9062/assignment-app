import { Schema, models, model, type Types, type Model, type HydratedDocument } from "mongoose";

// Canonical list of service categories. Labels are stored on documents, so keep
// these strings in sync with data/mock.ts (which adds slug + blurb + colour).
export const CATEGORIES = [
  "Fair copy & handwriting",
  "Practical files",
  "Notes",
  "Project guidance",
  "Report & thesis editing",
  "PPT & design",
  "Typing & formatting",
  "Printing & binding",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type SellerStatus = "none" | "pending" | "approved" | "rejected";
export type HandStyle = "kalam" | "caveat" | "patrick" | "shadows";
export type DeliveryMode = "pickup" | "delivery" | "digital";
export type JobStatus = "open" | "assigned" | "closed";
export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "delivered"
  | "completed"
  | "disputed"
  | "cancelled";

export interface SellerProfile {
  course: string;
  tags: string[];
  hand: HandStyle;
  sampleText: string;
  turnaroundDays: number;
}

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  college: string;
  city: string;
  bio: string;
  isSeller: boolean;
  isAdmin: boolean;
  // none -> pending (applied) -> approved (we checked the sample) | rejected
  sellerStatus: SellerStatus;
  sellerProfile: SellerProfile;
}

export type UserDoc = HydratedDocument<IUser>;

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, default: "" },
    college: { type: String, default: "" },
    city: { type: String, default: "Chandigarh" },
    bio: { type: String, default: "" },
    isSeller: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    sellerStatus: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
      index: true,
    },
    sellerProfile: {
      course: { type: String, default: "" },
      tags: { type: [String], default: [] },
      hand: { type: String, enum: ["kalam", "caveat", "patrick", "shadows"], default: "kalam" },
      sampleText: { type: String, default: "" },
      turnaroundDays: { type: Number, default: 3 },
    },
  },
  { timestamps: true }
);

export interface IService {
  seller: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  turnaroundDays: number;
  active: boolean;
}

export type ServiceDoc = HydratedDocument<IService>;

const ServiceSchema = new Schema<IService>(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: [...CATEGORIES], required: true, index: true },
    price: { type: Number, required: true, min: 1 },
    unit: { type: String, default: "per job" },
    turnaroundDays: { type: Number, default: 3, min: 1 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export interface IOffer {
  seller: Types.ObjectId;
  price: number;
  days: number;
  message: string;
}

const OfferSchema = new Schema<IOffer>(
  {
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true, min: 1 },
    days: { type: Number, default: 3, min: 1 },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

export interface IRequest {
  student: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  college: string;
  course: string;
  subject: string;
  pages: number;
  budget: number;
  deadline?: Date;
  deliveryMode: DeliveryMode;
  address: string;
  status: JobStatus;
  offers: IOffer[];
  createdAt: Date;
  updatedAt: Date;
}

export type RequestDoc = HydratedDocument<IRequest>;

const RequestSchema = new Schema<IRequest>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: [...CATEGORIES], required: true, index: true },
    college: { type: String, default: "" },
    course: { type: String, default: "" },
    subject: { type: String, default: "" },
    pages: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    deadline: { type: Date },
    deliveryMode: { type: String, enum: ["pickup", "delivery", "digital"], default: "pickup" },
    address: { type: String, default: "" },
    status: { type: String, enum: ["open", "assigned", "closed"], default: "open", index: true },
    offers: [OfferSchema],
  },
  { timestamps: true }
);

interface IMessage {
  from?: Types.ObjectId;
  text?: string;
  at: Date;
}

const MessageSchema = new Schema<IMessage>(
  { from: { type: Schema.Types.ObjectId, ref: "User" }, text: String, at: { type: Date, default: Date.now } },
  { _id: false }
);

export interface IOrder {
  buyer: Types.ObjectId;
  seller: Types.ObjectId;
  title: string;
  category?: string;
  price: number;
  commission: number;
  sellerPayout: number;
  dueDate?: Date;
  status: OrderStatus;
  deliveryNote: string;
  deliveryLink: string;
  paymentRef: string;
  review?: { rating?: number; text?: string };
  messages: IMessage[];
  service?: Types.ObjectId;
  request?: Types.ObjectId;
}

export type OrderDoc = HydratedDocument<IOrder>;

const OrderSchema = new Schema<IOrder>(
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
    paymentRef: { type: String, default: "" },
    review: { rating: { type: Number, min: 1, max: 5 }, text: String },
    messages: [MessageSchema],
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    request: { type: Schema.Types.ObjectId, ref: "Request" },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  (models.User as Model<IUser> | undefined) ?? model<IUser>("User", UserSchema);
export const Service: Model<IService> =
  (models.Service as Model<IService> | undefined) ?? model<IService>("Service", ServiceSchema);
export const Request: Model<IRequest> =
  (models.Request as Model<IRequest> | undefined) ?? model<IRequest>("Request", RequestSchema);
export const Order: Model<IOrder> =
  (models.Order as Model<IOrder> | undefined) ?? model<IOrder>("Order", OrderSchema);

export type { Types };

