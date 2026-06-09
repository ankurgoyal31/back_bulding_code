import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectToDatabase() {
    if (!db) {
        console.log("Connecting to database...");
        await client.connect();
        db = client.db("test");
        console.log("Database connected");
    }

    return {project: db.collection("projects"),blog: db.collection("blogs"),csr: db.collection("csrs")};
}

export { connectToDatabase };
