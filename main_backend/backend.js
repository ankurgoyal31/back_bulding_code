// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();
// import { connectToDatabase } from './connection.js';
// const app = express();
// app.use(cors());
// app.use(express.json());
// const port = 5000;
 
// app.get('/health', (req, res) => {
//     res.status(200).json({ message: 'Server is running!' });
// }); 

// app.get('/projects_video/:slug', async (req, res) => {
//     try {
//     const projectCollection = await connectToDatabase();        
//     const projects = await projectCollection.findOne({ slug: req.params.slug });
//     res.status(200).json(projects); 
//     } catch (error) {
//     console.error('Error fetching projects:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });
 
// app.get('/projects', async (req, res) => {
//     try {
//     const projectCollection = await connectToDatabase();        
//     const projects = await projectCollection.find({}).toArray();
//     res.status(200).json(projects); 
//     } catch (error) {
//     console.error('Error fetching projects:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './connection.js';

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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
