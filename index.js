// Import required modules



const express = require("express"); // Express framework for creating the server
const fs = require("fs"); // File system module for file operations
const path = require("path"); // Path module for handling file paths

const app = express(); // Initialize the Express application
const PORT = process.env.PORT || 3000; // Set the server port (default: 3000)

const cors = require("cors");
app.use(cors());


// Middleware for parsing JSON in request bodies
app.use(express.json());

// Define file path for feedback storage
const feedbackFilePath = path.join(process.cwd(), "data", "feedback.json");

/**
 * Helper function to read feedback data from the JSON file
 * @returns {Array} An array of feedback objects
 */
function readJSONFile() {
    try {
        const data = fs.readFileSync(feedbackFilePath, "utf8");
        return JSON.parse(data) || [];
    } catch (error) {
        console.error("Error reading file:", error);
        return []; // Return an empty array if the file doesn't exist or is invalid
    }
}

/**
 * Helper function to write feedback data to the JSON file
 * @param {Array} data - Array of feedback objects to write
 */
function writeJSONFile(data) {
    try {
        fs.writeFileSync(feedbackFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing file:", error);
    }
}

/**
 * Route: Submit Feedback
 * Endpoint: POST /submit-feedback
 * Description: Allows users to submit new feedback.
 */
app.post("/submit-feedback", (req, res) => {
    const { feedback, category, email } = req.body;

    // Input validation
    if (!feedback || !category) {
        return res.status(400).json({ message: "Feedback and category are required." });
    }

    // Create a new feedback object
    const newFeedback = {
        id: Date.now().toString(), // Unique ID based on the current timestamp
        feedback, // Feedback content
        category, // Feedback category
        email: email || null, // Optional email field
        status: "Submitted", // Default status
        timestamp: new Date().toISOString(), // Current date in ISO format
        admin_note: null, // Placeholder for admin notes
    };

    // Read existing feedback data
    const feedbackData = readJSONFile();

    // Add new feedback to the array
    feedbackData.push(newFeedback);

    // Write updated feedback data back to the file
    writeJSONFile(feedbackData);

    // Respond with success message
    res.status(200).json({ message: "Feedback submitted successfully!", id: newFeedback.id });
});

/**
 * Route: Update Feedback (Admin)
 * Endpoint: PATCH /update-feedback/:id
 * Description: Allows admins to update feedback status or admin notes.
 */
app.patch("/update-feedback/:id", (req, res) => {
    const feedbackId = req.params.id; // Get the feedback ID from the URL
    const { status, admin_note } = req.body; // Get updates from the request body

    // Read existing feedback data
    const feedbackData = readJSONFile();

    // Find the feedback item by ID
    const feedbackItem = feedbackData.find((item) => item.id === feedbackId);

    if (!feedbackItem) {
        return res.status(404).json({ message: "Feedback ID not found." });
    }

    // Update the feedback item
    feedbackItem.status = status || feedbackItem.status;
    feedbackItem.admin_note = admin_note || feedbackItem.admin_note;
    feedbackItem.timestamp = new Date().toISOString(); // Update timestamp

    // Write updated feedback data back to the file
    writeJSONFile(feedbackData);

    // Respond with success message
    res.status(200).json({ message: "Feedback updated successfully.", feedback: feedbackItem });
});

/**
 * Route: Get Feedback by ID
 * Endpoint: GET /get-feedback/:id
 * Description: Fetches a specific feedback item by ID.
 */
app.get("/get-feedback/:id", (req, res) => {
    const feedbackId = req.params.id; // Get the feedback ID from the URL

    // Read existing feedback data
    const feedbackData = readJSONFile();

    // Find the feedback item by ID
    const feedbackItem = feedbackData.find((item) => item.id === feedbackId);

    if (!feedbackItem) {
        return res.status(404).json({ message: "Feedback ID not found." });
    }

    // Respond with the feedback item
    res.status(200).json(feedbackItem);
});

/**
 * Start the server
 * Listens on the specified PORT and logs a message when the server is running.
 */
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});