I see you want to make the "Training" page more interactive. Currently, it has a simple alert for the demo booking, which feels a bit dated.

**Proposal for Interactivity Enhancements:**

1.  **Replace Alert with Custom Modal:**
    *   Instead of `alert("Thank you! Your demo class has been booked...")`, I will implement a sleek, dark-themed **Success Modal**.
    *   This modal will appear with a smooth animation (fade-in/scale-up).
    *   It will feature a success icon (check circle), a confirmation message, and a "Close" or "Back to Training" button.

2.  **Add Hover Effects to "Why We're Different" Table:**
    *   The comparison table at the bottom ("Why We're Different from Others") can be made more engaging.
    *   I will add row hover effects: slightly lighting up the background of the row being hovered.
    *   I will add a "glow" effect to the "Spheronix Technology" column to emphasize the benefits.

3.  **Smooth Scroll / Transitions:**
    *   Ensure that when the "Book a Demo" button is clicked, the interaction feels instant and polished.

**Plan:**
1.  **Create `BookingSuccessModal` Component**:
    *   A reusable component in `pages/Training/components/BookingSuccessModal.tsx`.
    *   It will take `isOpen` and `onClose` props.
    *   Styling will match the site's "glassmorphism" and dark neon theme.

2.  **Update `Training.tsx`**:
    *   Import and use the new modal.
    *   Replace the `alert()` call with `setIsModalOpen(true)`.

3.  **Enhance `WhyDifferent.tsx` (if it exists as a component) or the section in `Training.tsx`**:
    *   Add Tailwind classes for hover states on table rows (`hover:bg-white/5`).

I will start by creating the modal component and integrating it.
