import express from "express";
import helmet from "helmet";
import cors from "cors";

import user from "./app.js"
import connectdb from "./db.js"

const app  =  express();

const PORT = 3001;



connectdb();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors());
app.use(helmet());

app.get( "/" , (req,res) => {
    res.send("hey there my friend how are u whatup iwth u whats going on over there i how u are doing well")
})



app.post("/h", async (req, res) => {
    try {
        // 1. Create the instance
        // IMPORTANT: Use lowercase 'user' because that's how you imported it!
        const newUser = new user({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        // 2. Save to DB
        const savedData = await newUser.save();
        
        // 3. Send SUCCESS response
        return res.status(201).json({ message: "Saved!", data: savedData });

    } catch (err) {
        // 4. Send ERROR response
        console.error("Database Save Error:", err);
        return res.status(500).json({ error: err.message });
    }
}); 



// Return all users
app.get("/users", async (req, res) => {
    try {
        const users = await user.find().lean();
        return res.status(200).json({ data: users });
    } catch (err) {
        console.error("Database Read Error:", err);
        return res.status(500).json({ error: err.message });
    }
});

// Return a single user by id
app.get("/users/:id", async (req, res) => {
    try {
        const foundUser = await user.findById(req.params.id).lean();
        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ data: foundUser });
    } catch (err) {
        console.error("Database Read Error:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.listen( PORT , () => {
    console.log(`server is running on the port ${PORT}`)
})
