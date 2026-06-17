// import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();

// const client = new MongoClient(process.env.MONGO_URI);

// let db;

// async function connectToDatabase() {
//     if (!db) {
//         console.log("Connecting to database...");
//         await client.connect();
//         db = client.db("test");
//         console.log("Database connected");
//     }
//     return {project: db.collection("projects"),blog: db.collection("blogs"),csr: db.collection("csrs"),media: db.collection("media"),values: db.collection("values"),career: db.collection("career"),story: db.collection("ourstories"),value: db.collection("values"),impact: db.collection("impacts"),career: db.collection("careers")};
// }

// export { connectToDatabase };




import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config();

// ================= MongoDB =================

const client = new MongoClient(process.env.MONGO_URI);

let db;

// ================= AWS S3 =================

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        },
    }),

    limits: {
        fileSize: 100 * 1024 * 1024,
    },

    fileFilter: (req, file, cb) => {
        if (
            file.mimetype.startsWith("image/") ||
            file.mimetype.startsWith("video/") ||
            file.mimetype === "application/pdf" ||
            file.mimetype === "application/msword" ||
            file.mimetype ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only image, video, PDF, DOC, DOCX allowed"));
        }
    },
});

// ================= Database =================

async function connectToDatabase() {
    if (!db) {
        console.log("Connecting to database...");
        await client.connect();
        db = client.db("test");
        console.log("Database connected");
    }

    return {
        project: db.collection("projects"),
        blog: db.collection("blogs"),
        csr: db.collection("csrs"),
        media: db.collection("media"),
        story: db.collection("ourstories"),
        value: db.collection("values"),
        impact: db.collection("impacts"),
        career: db.collection("careers"),
        contact:db.collection("contacts"),
        home:db.collection("homes"),
        apply:db.collection("applied"),
    };
}

export { connectToDatabase, upload };
