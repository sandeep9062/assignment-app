import type { Types } from "mongoose";
import type { Category, DeliveryMode, HandStyle, JobStatus } from "./models";

export interface SellerProfileLean {
  course?: string;
  tags?: string[];
  hand?: HandStyle;
  sampleText?: string;
  turnaroundDays?: number;
}

export interface UserLean {
  _id: Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  college?: string;
  city?: string;
  bio?: string;
  isSeller?: boolean;
  isAdmin?: boolean;
  sellerStatus: string;
  sellerProfile?: SellerProfileLean | null;
}

export interface ServiceLean {
  _id: Types.ObjectId;
  seller: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  turnaroundDays?: number;
  active?: boolean;
}

export interface OfferLean {
  _id: Types.ObjectId;
  seller: Types.ObjectId;
  price: number;
  days?: number;
  message?: string;
}

export interface RequestLean {
  _id: Types.ObjectId;
  student: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  college?: string;
  course?: string;
  subject?: string;
  pages?: number;
  budget?: number;
  deadline?: Date | string;
  deliveryMode?: DeliveryMode;
  status: JobStatus;
  offers?: OfferLean[];
}

export type CategorySlug =
  | "fair-copy"
  | "practical-files"
  | "notes"
  | "project-guidance"
  | "report-editing"
  | "ppt-design"
  | "typing"
  | "printing";

export const CATEGORY_SLUG_TO_LABEL: Record<CategorySlug, Category> = {
  "fair-copy": "Fair copy & handwriting",
  "practical-files": "Practical files",
  notes: "Notes",
  "project-guidance": "Project guidance",
  "report-editing": "Report & thesis editing",
  "ppt-design": "PPT & design",
  typing: "Typing & formatting",
  printing: "Printing & binding",
};

export const CATEGORY_LABEL_TO_SLUG: Record<Category, CategorySlug> = {
  "Fair copy & handwriting": "fair-copy",
  "Practical files": "practical-files",
  Notes: "notes",
  "Project guidance": "project-guidance",
  "Report & thesis editing": "report-editing",
  "PPT & design": "ppt-design",
  "Typing & formatting": "typing",
  "Printing & binding": "printing",
};
