/**
 * Fetches feedback data from the API and dynamically updates the table.
 */
async function renderFeedback() {
    const feedbackList = document.getElementById("feedbackList"); // Target the table body
    feedbackList.innerHTML = ""; // Clear any existing rows in the table

    try {
        const response = await axios.get("/api/get-feedback"); // Fetch feedback from the back-end
        const feedbackData = response.data; // Extract data from the response

        // Loop through the feedback data and create table rows
        feedbackData.forEach((item) => {
            const row = document.createElement("tr"); // Create a new table row
            row.innerHTML = `
            <td>${item.text}</td> <!-- Feedback content -->
            <td>${item.category}</td> <!-- Feedback category -->
            <td class="status-${item.status.toLowerCase().replace(" ", "-")}">${item.status}</td> <!-- Feedback status -->
            <td>${item.lastUpdate}</td> <!-- Last update date -->
            `;
            feedbackList.appendChild(row); // Append the row to the table body
            });
            } catch (error) {
            console.error("Error fetching feedback data:", error); // Log errors
            alert("Failed to load feedback. Please try again later."); // Notify the user
            }
            }

            /**
            * Submits feedback to the API and refreshes the feedback table.
            */
            async function submitFeedback() {
            const category = document.getElementById("category").value; // Get category input
            const feedbackText = document.getElementById("feedback").value; // Get feedback input

            // Validate form inputs
            if (feedbackText.trim() === "" || category.trim() === "") {
            alert("Please fill out all fields."); // Alert the user
            return; // Stop execution if validation fails
            }

            const newFeedback = {
            feedback: feedbackText, // Feedback text
            category: category, // Selected category
            };

            try {
            await axios.post("/api/submit-feedback", newFeedback); // Submit feedback via the API
            alert("Your feedback has been submitted!"); // Notify user of success
            renderFeedback(); // Refresh the feedback table
            } catch (error) {
            console.error("Error submitting feedback:", error); // Log errors
            alert("Failed to submit feedback. Please try again later."); // Notify user of failure
            }

            // Reset form fields
            document.getElementById("feedbackForm").reset();
            }

            // Attach the submit feedback function to the form
            document.getElementById("feedbackForm").addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            submitFeedback(); // Trigger the feedback submission function
            });

            // Fetch and display feedback data when the page loads
            renderFeedback();
