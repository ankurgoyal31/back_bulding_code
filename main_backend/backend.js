import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase, upload } from "./connection.js";
import { ObjectId } from 'mongodb';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running!' });
});

app.get('/projects_video/:slug', async (req, res) => {
    try {
        const { project } = await connectToDatabase();
 
        const projects = await project.findOne({
            slug: req.params.slug
        });

        res.status(200).json(projects);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/projects', async (req, res) => {
    try {
        const { project } = await connectToDatabase();

        const projects = await project.find({}).toArray();

        res.status(200).json(projects);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/CSR_data', async (req, res) => {
    try {
        const { csr } = await connectToDatabase();

        const csrData = await csr.find({}).toArray();

        res.status(200).json(csrData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/blogs", async (req, res) => {
    try {
        const { blog } = await connectToDatabase();

        const blogData = await blog.find({}).toArray();

        res.status(200).json(blogData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/blogs/:id", async (req, res) => {
    try {
        const { blog } = await connectToDatabase();
        const blogId = req.params.id;

        const blogData = await blog.findOne({ _id: new ObjectId(blogId) });
        res.status(200).json(blogData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/media", async (req, res) => {
    try {
        const { media } = await connectToDatabase();
        const mediaData = await media.find({}).toArray();
        res.status(200).json(mediaData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get("/story", async (req, res) => {
    try {
        const { story } = await connectToDatabase();
        const storyData = await story.find({}).toArray();
        res.status(200).json(storyData); 
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/values", async (req, res) => {
    try {
        const { value } = await connectToDatabase();
        const storyData = await value.find({}).toArray();
        res.status(200).json(storyData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get("/impacts", async (req, res) => {
    try {
        const { impact } = await connectToDatabase();
        const impactData = await impact.find({}).toArray();
        res.status(200).json(impactData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get("/careers", async (req, res) => {
    try {
        const { career } = await connectToDatabase();
        const careerData = await career.find({}).toArray();
        res.status(200).json(careerData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post("/apply", upload.single("cv"), async (req, res) => {
    try {
        const {apply} = await connectToDatabase();

        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            experience: req.body.experience,
            job: req.body.job,
            post: req.body.post,
            cv: req.file ? req.file.location : null, // AWS S3 URL
            createdAt: new Date()
        };

        const result = await apply.insertOne(data);

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: result
        }); 

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});


app.post("/subscribe", upload.single("cv"), async (req, res) => {
    try {
        const {contact} = await connectToDatabase();

        const data = {
             email: req.body.text,
             message:req.body.message,
             createdAt: new Date()
        };
await contact.insertOne(data)
        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
        }); 

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

app.get("/home_data", async (req, res) => {
    try {
        const { home } = await connectToDatabase();
        const homeData = await home.find({}).toArray();
        res.status(200).json(homeData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
