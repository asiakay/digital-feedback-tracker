import fs from "fs"; // File system module to interact with files
import path from "path"; // Path module to resolve file paths





/**
 * Handles submitting new feedback to the `feedback.json` file.
 */
export default function handler(req, res) {
    const filePath = path.join(process.cwd(), "data", "feedback.json"); // Path to the feedback file

    if (req.method === "POST") {
        const { feedback, category } = req.body; // Extract feedback and category from the request body

        if (!feedback || !category) {
            return res.status(400).json({ message: "Feedback and category are required." }); // Handle missing fields
        }

        const newFeedback = {
            id: Date.now().toString(), // Generate unique ID
            feedback, // Feedback text
            category, // Feedback category
            status: "Submitted", // Default status
            lastUpdate: new Date().toISOString(), // Current timestamp
        };

        try {
            let feedbackData = [];
            if (fs.existsSync(filePath)) {
                feedbackData = JSON.parse(fs.readFileSync(filePath, "utf8")); // Parse existing feedback
            }

            feedbackData.push(newFeedback); // Add new feedback
            fs.writeFileSync(filePath, JSON.stringify(feedbackData, null, 2)); // Write updated feedback

            res.status(200).json({ message: "Feedback submitted successfully!" }); // Return success
        } catch (error) {
            console.error("Error writing to JSON file:", error); // Log errors
            res.status(500).json({ message: "Failed to save feedback." }); // Return server error
        }
    } else {
        res.setHeader("Allow", ["POST"]); // Allow only POST method
        res.status(405).end(`Method ${req.method} Not Allowed`); // Handle invalid methods
    }
}

/*function readJSONFile() {
    try {
        const data = fs.readFileSync(feedbackFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);
        return []; // Return an empty array if the file doesn't exist or is invalid
    }
}

*/