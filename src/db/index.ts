import { MongoClient, type MongoClientOptions } from "mongodb";

const url = `mongodb+srv://leonelroman:${process.env.DB_PASS}@cluster0.fo3dmlm.mongodb.net/?w=majority`;

const client = new MongoClient(url, {
  retryWrites: true,
  appName: "Cluster0",
} as MongoClientOptions);

await client.connect();

export const productsModel = client
  .db(process.env.DB_NAME)
  .collection("products");

export const adminModel = client.db(process.env.DB_NAME).collection("admin");
