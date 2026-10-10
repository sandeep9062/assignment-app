import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studyhub";

// Reuse the connection across hot reloads in dev and across serverless invocations.
type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

const globalForMongoose = globalThis as typeof globalThis & { _mongoose?: MongooseCache };

let cached = globalForMongoose._mongoose;
if (!cached) cached = globalForMongoose._mongoose = { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose> {
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) cached!.promise = mongoose.connect(uri, { bufferCommands: false });
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
