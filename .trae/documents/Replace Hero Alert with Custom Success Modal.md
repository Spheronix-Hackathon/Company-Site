I see you want to improve the "Book Your Seat" confirmation experience.

**Current Behavior:**
When the "Book Your Seat" button is clicked in the `Hero.tsx` component (as shown in your screenshot), it triggers a simple `alert()`:
`"Thank you! Your demo class has been booked. Our team will contact you shortly."`

**Requested Behavior:**
You want to replace this alert with a more professional confirmation message:
`"Thank you for your interest in our company, our team will contact you soon."`

**Plan:**
1.  **Identify the Component:** Based on the screenshot, this "Book Your Seat" button is in the `Hero.tsx` component (the hero section with the "Transformation in 180 Days" headline).
2.  **Enhance Interactivity:** Instead of just changing the alert text, I will reuse the **`BookingSuccessModal`** I created earlier. This will provide a consistent and premium experience across the site.
3.  **Update `Hero.tsx`:**
    *   Import `BookingSuccessModal`.
    *   Add state to manage the modal (`isModalOpen`).
    *   Update the button's `onClick` handler to open this modal instead of showing an alert.
    *   I will also update the text inside `BookingSuccessModal.tsx` to match your specific request: `"Thank you for your interest in our company, our team will contact you soon."`

I will start by updating the modal text and then integrating it into the Hero section.
