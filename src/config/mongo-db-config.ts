import "dotenv/config";

const mongo_uri = process.env.MONGO_URI || "";

export default mongo_uri;
