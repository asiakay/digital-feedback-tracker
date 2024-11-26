import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const feedback = req.body;

        // Save feedback to a JSON file (for local testing)
        const filePath = path.join(process.cwd(), 'feedback.json');
        const fileData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
        fileData.push(feedback);

        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

        return res.status(200).json({ message: 'Feedback submitted successfully!' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}