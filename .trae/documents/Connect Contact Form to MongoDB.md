I will implement the MongoDB integration for the contact form as requested.

**Plan:**

1.  **Backend Setup (`server/index.js`)**:
    *   Install `mongoose` to interact with MongoDB.
    *   Connect to MongoDB using the provided `MONGO_URI`.
    *   Define a `Contact` Mongoose schema with fields: `name`, `email`, `domain`, `scale`, `message`.
    *   Update the `/api/contact` route to:
        *   Save the form data to MongoDB.
        *   Keep the existing email notification logic (optional, but good practice to keep notification).
        *   Return a success response.

2.  **Frontend Update (`pages/Contact.tsx`)**:
    *   Update the `handleSubmit` function:
        *   Add a loading state (`isSubmitting`) to the button.
        *   Send the data to the backend.
        *   On success:
            *   Show a toast/success message (The current code already has a "Mission Received" success screen, which is great).
            *   Clear the form fields.
        *   On error: Show an alert.

3.  **Environment Variables**:
    *   Update `server/.env` to include the `MONGO_URI`.

4.  **Dependencies**:
    *   I will run `npm install mongoose` in the `server` directory.

This ensures that when a user submits the form, the data is securely stored in your MongoDB cluster and the user gets immediate feedback.
