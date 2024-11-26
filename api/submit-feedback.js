import * as xlsx from "xlsx";
import path from "path";
import fs from "fs";

export default function handler(req, res) {
    if (req.method === "POST") {
        const { feedback, category, email } = req.body;

        if (!feedback || !category) {
            return res.status(400).json({ message: "Feedback and category are required." });
        }

        const newFeedback = {
            ID: Date.now().toString(),
            Feedback: feedback,
            Category: category,
            Email: email || "N/A",
            Status: "Submitted",
            Timestamp: new Date().toISOString(),
            AdminNote: "",
        };

        // File path for the Excel file
        const filePath = path.join(process.cwd(), "feedback.xlsx");

        try {
            let workbook;
            let worksheet;

            // Check if the file already exists
            if (fs.existsSync(filePath)) {
                // Read the existing workbook
                workbook = xlsx.readFile(filePath);
                worksheet = workbook.Sheets["Feedback"] || workbook.Sheets[workbook.SheetNames[0]];
            } else {
                // Create a new workbook and worksheet
                workbook = xlsx.utils.book_new();
                worksheet = xlsx.utils.json_to_sheet([]);
                xlsx.utils.book_append_sheet(workbook, worksheet, "Feedback");
            }

            // Convert the worksheet to JSON, add the new feedback, and write it back
            const feedbackData = xlsx.utils.sheet_to_json(worksheet);
            feedbackData.push(newFeedback);
            const updatedWorksheet = xlsx.utils.json_to_sheet(feedbackData);

            // Update the workbook
            workbook.Sheets["Feedback"] = updatedWorksheet;
            xlsx.writeFile(workbook, filePath);

            res.status(200).json({ message: "Feedback submitted successfully!" });
        } catch (error) {
            console.error("Error writing to Excel file:", error);
            res.status(500).json({ message: "Failed to save feedback." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}