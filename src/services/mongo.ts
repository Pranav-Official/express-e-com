import { Db, MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";
import { config } from "dotenv";
import mongo_uri from "../config/mongo-db-config";

const client = new MongoClient(mongo_uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToMongoDb = async () => {
  try {
    console.log(mongo_uri);
    await client.connect();
    console.log("Connected to MongoDB");
    const db: Db = client.db("e_commerce");
    await db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log(err);
  }
};

const disconnectFromMongoDb = async () => {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.log(err);
  }
};

export { connectToMongoDb, disconnectFromMongoDb, client };
