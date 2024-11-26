const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// File path to the JSON database
const filePath = "./feedback.json";

// Helper function to read JSON data
const readJSONFile = () => {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
};

// Helper function to write JSON data
const writeJSONFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Route: Submit Feedback
app.post("/submit-feedback", (req, res) => {
    const newFeedback = {
        id: Date.now().toString(), // Unique ID based on timestamp
        feedback: req.body.feedback,
        category: req.body.category,
        email: req.body.email || null,
        status: "Submitted",
        timestamp: new Date().toISOString(),
        admin_note: null
    };

    const feedbackData = readJSONFile();
    feedbackData.push(newFeedback);
    writeJSONFile(feedbackData);

    res.status(200).json({ message: "Feedback submitted successfully!", id: newFeedback.id });
});

// Route: Update Feedback (Admin)
app.patch("/update-feedback/:id", (req, res) => {
    const feedbackId = req.params.id;
    const feedbackData = readJSONFile();
    const feedbackItem = feedbackData.find((item) => item.id === feedbackId);

    if (!feedbackItem) {
        return res.status(404).json({ message: "Feedback ID not found." });
    }

    feedbackItem.status = req.body.status || feedbackItem.status;
    feedbackItem.admin_note = req.body.admin_note || feedbackItem.admin_note;
    feedbackItem.timestamp = new Date().toISOString();

    writeJSONFile(feedbackData);

    res.status(200).json({ message: "Feedback updated successfully.", feedback: feedbackItem });
});

// Route: Get Feedback by ID
app.get("/get-feedback/:id", (req, res) => {
    const feedbackId = req.params.id;
    const feedbackData = readJSONFile();
    const feedbackItem = feedbackData.find((item) => item.id === feedbackId);

    if (!feedbackItem) {
        return res.status(404).json({ message: "Feedback ID not found." });
    }

    res.status(200).json(feedbackItem);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});