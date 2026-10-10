// Quick check: prints the connected database name and collection counts.
//   npm run verify
import mongoose from "mongoose";
import { User, Service, Request } from "../lib/models";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Run with: npm run verify");
  process.exit(1);
}

await mongoose.connect(uri);
console.log("Connected database:", mongoose.connection.name);
console.log("Users:", await User.countDocuments());
console.log("  approved sellers:", await User.countDocuments({ sellerStatus: "approved" }));
console.log("Services:", await Service.countDocuments());
console.log("Requests:", await Request.countDocuments());
await mongoose.disconnect();
