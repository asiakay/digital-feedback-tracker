import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method === "POST") {
        const filePath = path.join(process.cwd(), "feedback.json");

        // Read the existing feedback
        let feedbackData;
        try {
            feedbackData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        } catch (error) {
            feedbackData = [];
        }

        const newFeedback = {
            id: Date.now().toString(),
            feedback: req.body.feedback,
            category: req.body.category,
            email: req.body.email || null,
            status: "Submitted",
            timestamp: new Date().toISOString(),
            admin_note: null,
        };

        feedbackData.push(newFeedback);

        fs.writeFileSync(filePath, JSON.stringify(feedbackData, null, 2));

        res.status(200).json({ message: "Feedback submitted successfully!", id: newFeedback.id });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}