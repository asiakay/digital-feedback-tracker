import fs from "fs"; // File system module for reading and writing files
import path from "path"; // Path module to handle file paths

// API handler for updating feedback
export default function handler(req, res) {
    // Define the path to the feedback JSON file
    const filePath = path.join(process.cwd(), "data", "feedback.json");

    if (req.method === "PATCH") {
        const { id } = req.query; // Extract the feedback ID from the URL query
        const { status, admin_note } = req.body; // Extract the updated fields from the request body

        try {
            // Check if the feedback file exists
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "No feedback data found." });
            }

            // Read and parse the existing feedback data
            const feedbackData = JSON.parse(fs.readFileSync(filePath, "utf8"));

            // Find the feedback entry with the matching ID
            const feedbackItem = feedbackData.find((item) => item.id === id);

                        // If no feedback entry is found, return a 404 error
                        if (!feedbackItem) {
                            return res.status(404).json({ message: "Feedback ID not found." });
                        }

                        // Update the feedback entry with the new values, if provided
                        feedbackItem.status = status || feedbackItem.status; // Update status if provided
                        feedbackItem.admin_note = admin_note || feedbackItem.admin_note; // Update admin note if provided
                        feedbackItem.timestamp = new Date().toISOString(); // Update the timestamp

                        // Write the updated feedback data back to the JSON file
                        fs.writeFileSync(filePath, JSON.stringify(feedbackData, null, 2));

                        // Respond with the updated feedback entry
                        res.status(200).json({ message: "Feedback updated successfully.", feedback: feedbackItem });
                    } catch (error) {
                        console.error("Error updating feedback data:", error); // Log the error for debugging
                        res.status(500).json({ message: "Failed to update feedback." });
                    }
                } else {
                    // Handle unsupported HTTP methods
                    res.setHeader("Allow", ["PATCH"]);
                    res.status(405).end(`Method ${req.method} Not Allowed`);
                }
            }