    // Sample data to store feedback items (this simulates a database for now)
    let feedbackData = [
        { text: "Add more quiet study spaces.", category: "Facilities", status: "In Progress", lastUpdate: "2024-11-22" },
        { text: "Offer more vegan options in dining.", category: "Dining", status: "Submitted", lastUpdate: "2024-11-20" },
        { text: "Provide better advising for transfers.", category: "Academics", status: "Resolved", lastUpdate: "2024-11-19" },
    ];

    /**
     * Function to render the feedback table
     * This function dynamically updates the feedback table based on `feedbackData`.
     */
    function renderFeedback() {
        const feedbackList = document.getElementById("feedbackList"); // Target the table body
        feedbackList.innerHTML = ""; // Clear any existing rows in the table

        // Loop through the feedback data and create table rows
        feedbackData.forEach((item) => {
            const row = document.createElement("tr"); // Create a new table row
            row.innerHTML = `
                <td>${item.text}</td> <!-- Feedback content -->
                <td>${item.category}</td> <!-- Category of feedback -->
                <td class="status-${item.status.toLowerCase().replace(" ", "-")}">${item.status}</td> <!-- Status with color-coded class -->
                <td>${item.lastUpdate}</td> <!-- Last update date -->
            `;
            feedbackList.appendChild(row); // Append the row to the table body
        });
    }

    /**
     * Function to handle feedback submission
     * This function collects data from the form, validates it, and adds it to `feedbackData`.
     */
    function submitFeedback() {
        // Retrieve the values from the form inputs
        const category = document.getElementById("category").value; // Category dropdown
        const feedbackText = document.getElementById("feedback").value; // Feedback textarea

        // Check if the feedback or category fields are empty
        if (feedbackText.trim() === "" || category.trim() === "") {
            alert("Please fill out all fields."); // Alert the user to fill out the form
            return; // Stop execution if validation fails
        }

        // Create a new feedback object
        const newFeedback = {
            text: feedbackText, // Feedback content
            category: category, // Selected category
            status: "Submitted", // Default status for new feedback
            lastUpdate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
        };

        // Add the new feedback to the data array
        feedbackData.push(newFeedback);

        // Reset the form fields
        document.getElementById("feedbackForm").reset();

        // Show a confirmation message to the user
        alert("Your feedback has been submitted!");

        // Refresh the feedback table to include the new item
        renderFeedback();
    }

    // Initialize the feedback table when the page loads
    renderFeedback();








