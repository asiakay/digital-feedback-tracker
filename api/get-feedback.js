import fs from "fs"; // File system module to interact with files
import path from "path"; // Path module to resolve file paths

/**
 * Handles fetching all feedback from the `feedback.json` file.
 */
export default function handler(req, res) {
    const filePath = path.join(process.cwd(), "data", "feedback.json"); // Path to the feedback file

    try {
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "No feedback data found." }); // Handle missing file
        }
        const feedbackData = JSON.parse(fs.readFileSync(filePath, "utf8")); // Read and parse the file
        res.status(200).json(feedbackData); // Return feedback data
    } catch (error) {
        console.error("Error reading JSON file:", error); // Log errors
        res.status(500).json({ message: "Failed to read feedback data." }); // Return server error
    }
}