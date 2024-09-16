// api/comments.js

import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

// Connect to MongoDB
async function connectToDatabase(uri) {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('myDatabase'); // Replace with your database name

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

// Handler for the serverless function
export default async (req, res) => {
  const { method } = req;

  const { db } = await connectToDatabase(process.env.MONGO_URI);
  const commentsCollection = db.collection('comments');

  if (method === 'POST') {
    const { name, comment, isSpoiler, timestamp } = req.body;

    if (!comment || !timestamp) {
      return res.status(400).json({ error: 'Comment and timestamp are required' });
    }

    // Insert comment into MongoDB
    const newComment = { name: name || 'Anonymous', comment, isSpoiler, timestamp };
    await commentsCollection.insertOne(newComment);

    return res.status(201).json(newComment);
  } else if (method === 'GET') {
    // Fetch all comments
    const comments = await commentsCollection.find({}).toArray();
    return res.status(200).json(comments);
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${method} Not Allowed`);
};