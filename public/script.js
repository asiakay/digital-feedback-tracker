import axios from "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";

// Base URL for API endpoints
const API_BASE_URL = "/api";

// Function to render the feedback table
async function renderFeedback() {
    const feedbackList = document.getElementById("feedbackList");
    feedbackList.innerHTML = "<tr><td colspan='4'>Loading...</td></tr>";

    try {
        const response = await axios.get(`${API_BASE_URL}/get-feedback`);
        const feedbackData = response.data;

        feedbackList.innerHTML = ""; // Clear the loading message
        feedbackData.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.feedback}</td>
                <td>${item.category}</td>
                <td class="status-${item.status.toLowerCase().replace(" ", "-")}">${item.status}</td>
                <td>${item.lastUpdate}</td>
            `;
            feedbackList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching feedback data:", error);
        alert("Failed to load feedback. Please try again later.");
    }
}

// Function to handle feedback submission
async function submitFeedback() {
    const category = document.getElementById("category").value;
    const feedbackText = document.getElementById("feedback").value;

    if (feedbackText.trim() === "" || category.trim() === "") {
        alert("Please fill out all fields.");
        return;
    }

    const newFeedback = {
        feedback: feedbackText,
        category: category,
    };

    try {
        await axios.post(`${API_BASE_URL}/submit-feedback`, newFeedback);
        alert("Your feedback has been submitted!");
        document.getElementById("feedbackForm").reset();
        renderFeedback(); // Refresh the feedback table
    } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Failed to submit feedback. Please try again later.");
    }
}

// Attach the submitFeedback function to the form
document.getElementById("feedbackForm").addEventListener("submit", (e) => {
    e.preventDefault();
    submitFeedback();
});

// Fetch and display feedback data when the page loads
renderFeedback();