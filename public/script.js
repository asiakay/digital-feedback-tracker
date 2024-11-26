const axios = require("axios");


    /**
     * Function to render the feedback table
     * This function dynamically updates the feedback table based on `feedbackData`.
     */
  async function renderFeedback() {
        const feedbackList = document.getElementById("feedbackList"); // Target the table body
        feedbackList.innerHTML = ""; // Clear any existing rows in the table

try {
    const response = await axios.get("/api/get-feedback"); // Fetching feedback data from the backend server (index.js)

const feedbackData = response.data; // Extracting the feedback data from the response

    //for each entry submitted feedback data, Loop through the feedback data and create table rows

    feedbackData.forEach((item) => {
        const row = document.createElement("tr"); // Create a new row 
row.innerHTML = `
<td>${item.text}</td>
<td><!-- Feedback content -->
<td>${item.category}</td><!-- Feedback category -->

<td class="status-${item.status.toLowerCase().replace(" ", "-")}">${item.status}</td><!-- Feedback status -->
<td>${item.lastUpdate}</td><!-- Last update date--> 
`;

feedbackList.appendChild(row); // Append the row to the table body

    });
}
      catch (error) {
          console.error("Error fetching feedback data:", error); // Logging the errors to console 

alert( "Failed to load feedback. Please try again later."); // Notifying the user that feedback could not be loaded
      }
      }
        
// Reset form fields
/* document.getElementById("feedbackForm").reset(); */

// Attach the submit feedback function to the form

document.getElementById("feedbackForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    submitFeedback(); // Triggering the feedback submission function whenuser submits form 
});
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
catch (error) {
    console.error("Error fetching feedback data:", error); // Logging the errors to console
    alert("Failed to load feedback. Please try again later."); // Notifying the user that feedback could not be loaded
}


    /**
     * Function to handle feedback submission
     * This function collects data from the form, validates it, and adds it to `feedbackData`.
     */
   async function submitFeedback() {
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
        };
       
       try {
           await axios.post("/api/submit-feedback", newFeedback);
           // submit feedback via the middleware API

           alert("Your feedback has been submitted!"); // Notify user of success

           renderFeedback();
           // Refresh the feedback table
           
       }
        catch (error) {
            console.error("Error submitting feedback:", error); // Logging the errors to console
            alert("Failed to submit feedback. Please try again later."); // Notify user of failure

        }
        // Reset the form fields

       document.getElementById("feedbackForm").reset();
        }

// attach the submitFeedback function to the form

document.getElementById("feedbackForm").addEventListener("submit", (e) => {

    e.preventDefault(); 
    // prevening the default form submission behavior
}

submitFeedback();
   // Triggerring the feedback submission function when user submits form
});

// Fetch and display feedback data when the page loads

renderFeedback();



/*


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








*/