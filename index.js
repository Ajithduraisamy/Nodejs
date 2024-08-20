const express = require("express");
const cors = require("cors");
const { MongoClient,ObjectId } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors({
    // origin: "http://localhost:5173"
    origin: "https://courageous-moonbeam-aafce4.netlify.app"
}));

/* const URL = "mongodb+srv://ajith0623:Ajithkkumar0695@cluster0.rw6jcmo.mongodb.net/"; */

const URL =  "mongodb+srv://ajith0623:WCNnRqJMA9gvorE7@cluster0.rw6jcmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.get("/", (req, res) => {
    res.json({ Message: "success" });
});

app.post("/user", async (req, res) => {
    try {
        console.log("Connecting to MongoDB...");
        const client = new MongoClient(URL);
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("Nodejs");
        const collection = db.collection("users");
        console.log("Inserting user...");
        await collection.insertOne(req.body);
        console.log("User inserted");
        await client.close();
        console.log("Connection closed");
        res.json({ Message: "User Created!" });
    } catch (error) {
        res.status(500).json({ Message: "Something went wrong", error: error.message });
    }
});

app.get("/users", async (req, res) => {
    try {
        console.log("Connecting to MongoDB...");
        const client = new MongoClient(URL);
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("Nodejs");
        const collection = db.collection("users");
        console.log("Inserting user...");
        const users= await collection.find({}).toArray();
        console.log("User Received");
        await client.close();
        console.log("Connection closed");
        res.json(users);
    } catch (error) {
        res.status(500).json({ Message: "Something went wrong", error: error.message });
    }
});

app.put("/user/:userId", async (req, res) => {
    try {
        console.log("Connecting to MongoDB...");
        const client = new MongoClient(URL);
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("Nodejs");
        const collection = db.collection("users");
        console.log("Updating user with ID:", req.params.userId);
        console.log("Update data:", req.body);

        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.userId) },
            { $set: req.body }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ Message: "User not found" });
        }

        console.log("User Updated");
        await client.close();
        console.log("Connection closed");
        res.json({ Message: "User Updated!" });
    } catch (error) {
        console.error("Error during update:", error.message);
        res.status(500).json({ Message: "Something went wrong", error: error.message });
    }
});


app.delete("/user/:userId", async (req, res) => {
    try {
        console.log("Connecting to MongoDB...");
        const client = new MongoClient(URL);
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("Nodejs");
        const collection = db.collection("users");
        console.log("Inserting user...");
        await collection.deleteOne({_id: new ObjectId(req.params.userId)})
        console.log("User Updated");
        await client.close();
        console.log("Connection closed");
        res.json({ Message: "User Deleted!" });
    } catch (error) {
        res.status(500).json({ Message: "Something went wrong", error: error.message });
    }
});

app.get("/user/:userId", async (req, res) => {
    try {
        console.log("Connecting to MongoDB...");
        const client = new MongoClient(URL);
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("Nodejs");
        const collection = db.collection("users");
        console.log("Inserting user...");
        const users= await collection.findOne({_id: new ObjectId(req.params.userId)});
        console.log("User Received");
        await client.close();
        console.log("Connection closed");
        res.json(users);
    } catch (error) {
        res.status(500).json({ Message: "Something went wrong", error: error.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
