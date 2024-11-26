const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route to handle feedback submission
app.post('/submit-feedback', (req, res) => {
    const newFeedback = req.body;

    // Read existing feedback from feedback.json
    fs.readFile('feedback.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to read feedback database.");
        }

        const feedbackArray = JSON.parse(data);
        feedbackArray.push(newFeedback);

        // Write updated feedback array back to feedback.json
        fs.writeFile('feedback.json', JSON.stringify(feedbackArray, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Failed to update feedback database.");
            }

            res.status(200).send("Feedback submitted successfully!");
        });
    });
});

// Start the server
// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});