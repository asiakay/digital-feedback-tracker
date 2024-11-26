Thank you for your support
patreon: Asialakay


To create a functional simplified MVP for the Digital Feedback Tracker, you’ll need the following pages or sections:

1. Home Page (Main Interface)

  •	Purpose: This is the central hub where users can:
  •	Submit feedback.
  •	View the status of their feedback.
  •	See resolved feedback items.
  •	Key Features:
  •	Feedback submission form (category dropdown, feedback textarea, and submit button).
  •	Feedback status table (dynamic display of submitted feedback with status and last update).
  •	Resolved feedback section (list of resolved issues).
  •	Completion Checklist:
  •	Responsive layout for desktop and mobile.
  •	Basic styling for usability.
  •	Form validation for input fields.

2. Submission Confirmation (Optional Section/Popup)

  •	Purpose: Confirm successful feedback submission.
  •	Key Features:
  •	A confirmation popup or message after feedback submission.
  •	Redirect users to the feedback status section or refresh the table dynamically.
  •	Completion Checklist:
  •	JavaScript logic for displaying a confirmation message or modal.
  •	Integration with feedback submission logic.

3. Admin/Manager Page (Optional for Future)

  •	Purpose: Manage submitted feedback (e.g., update statuses, resolve issues).
  •	Key Features:
  •	View all submitted feedback with edit options.
  •	Update feedback status (e.g., change “Submitted” to “In Progress” or “Resolved”).
  •	Ability to delete feedback items.
  •	Completion Checklist:
  •	Restricted access (only for admins/managers).
  •	Status update functionality.
  •	Optional search and filter features.

4. About or Documentation Page (Optional for Future)

  •	Purpose: Explain the purpose and functionality of the app to users.
  •	Key Features:
  •	A brief description of the app’s goals and how it works.
  •	Contact or support information.
  •	Completion Checklist:
  •	Clear content explaining the app.
  •	Links to GitHub repository or additional resources.

5. Backend API (Serverless or Integrated)

  •	Purpose: Handle data submission and retrieval for dynamic functionality.
  •	Key Features:
  •	API route to handle feedback submission (POST /submit-feedback).
  •	API route to fetch existing feedback data (GET /get-feedback).
  •	Completion Checklist:
  •	Serverless functions on Vercel (or backend service like Firebase, Node.js).
  •	Connected to a JSON database or cloud database (e.g., Firebase or MongoDB).

Simplified MVP Focus

For the simplified MVP, focus on completing just the Home Page with:
  1.	Submission Form:
  •	Dropdown for category selection.
  •	Textarea for feedback content.
  •	Submit button with JavaScript logic.
  2.	Feedback Status Display:
  •	Table showing feedback, category, status, and last update.
  3.	Resolved Feedback Section:
  •	Static or dynamic list of resolved items.





## Case Study Excerpt: Addressing the Need for Feedback Transparency

Identified User Pain Point

Through user interviews and direct feedback sessions, it was consistently highlighted that students felt disconnected from the resolution process after submitting feedback. Users expressed frustration at submitting detailed suggestions or complaints but receiving no clear updates on whether their feedback was reviewed, acted upon, or resolved.

User Quote

“I often submit feedback, but I never know what happens next. It’s like my input goes into a void.”

Research Insights

The lack of transparency in the feedback lifecycle contributes to diminished trust in the platform, disengagement from future submissions, and a sense of being unheard. Users specifically requested a systematic notification mechanism to stay informed about the status of their feedback.

Key Requests

  1.	Email Notifications:
Users preferred being notified about critical updates, such as:
  •	Confirmation of feedback submission.
  •	Changes in the feedback status (e.g., “In Progress” or “Resolved”).
  •	Resolution details.
  2.	Real-Time Updates:
Some users requested immediate updates visible within the platform, such as a tracking system where they could check the current status of their feedback.
  3.	Push Notifications (Optional):
For users who are consistently engaged, notifications delivered to their devices were considered a desirable feature.

Design Solution

To address the user feedback, we proposed a tiered notification system:
  1.	Immediate Confirmation: Upon submitting feedback, users receive a confirmation email with a unique tracking ID and details about their submission.
  2.	Lifecycle Updates: Users are notified via email or in-platform messages when:
  •	Feedback status changes (e.g., “Reviewed,” “In Progress”).
  •	Their feedback is resolved, with a summary of the action taken.
  3.	Feedback Tracking Dashboard:
Users can log into the platform to:
  •	View the status of all submitted feedback.
  •	Access the history of resolved issues.

Impactful Metrics to Track

  1.	Increase in user engagement: The number of feedback submissions rises as users feel more connected to the resolution process.
  2.	Reduced frustration: Positive feedback about the system grows as users trust the platform.
  3.	Retention improvement: Students show increased engagement over multiple semesters due to a visible and accountable feedback loop.

Example Design Iteration

We developed a low-fidelity prototype showcasing:
  •	An enhanced submission form with the option to opt-in for email updates.
  •	A “Track My Feedback” button allowing users to view their submission’s status in real time.
  •	A demo email notification sent to users when their feedback is marked as “In Progress” or “Resolved.”

User Testing

During usability testing, students noted:
  •	Positives: The email confirmation increased confidence in the system.
  •	Negatives: Some users felt overwhelmed by too many notifications, suggesting a preference toggle for critical updates only.

Conclusion

Incorporating user-driven feedback mechanisms not only addresses transparency issues but also establishes trust and loyalty among users. By offering multiple ways to stay informed, such as email updates and tracking dashboards, the system ensures that no feedback is left unacknowledged.