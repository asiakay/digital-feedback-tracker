import * as xlsx from "xlsx";
import path from "path";
import fs from "fs";

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), "feedback.xlsx"); // Path to the Excel file

    try {
        // Check if the Excel file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "No feedback data found." });
        }

        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets["Feedback"];

        // Convert the worksheet to JSON
        const feedbackData = xlsx.utils.sheet_to_json(worksheet);

        // Return the feedback data
        res.status(200).json(feedbackData);
    } catch (error) {
        console.error("Error reading Excel file:", error);
        res.status(500).json({ message: "Failed to read feedback data." });
    }
}