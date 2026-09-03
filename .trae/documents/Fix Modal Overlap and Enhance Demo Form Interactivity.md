I see the issue. When the "Book Your Free Demo" modal opens, it seems to be partially transparent or overlapping with the background content in a messy way (as seen in the screenshot where "Our Students Are Placed In Top Companies" text is bleeding through the modal).

**The Issues:**
1.  **Z-Index Conflict**: The modal's z-index might not be high enough, or the backdrop isn't opaque enough, causing background elements (like the "Our Students..." text) to show through.
2.  **Visual Clutter**: The modal content itself is fighting with the background.
3.  **Enhancement Request**: You want the "Book Your Free Demo" section to be more interactive and cleaner.

**Plan to Fix & Enhance:**

1.  **Fix Modal Visibility (Z-Index & Backdrop):**
    *   Increase the `z-index` of the modal container to `z-[100]` to ensure it sits on top of everything.
    *   Make the backdrop darker and blurrier: `bg-slate-950/90 backdrop-blur-md`. This will completely hide the background distractions.

2.  **Enhance the Form Layout:**
    *   The current layout is a bit cramped. I will adjust the padding and spacing.
    *   **Interactive Inputs**: Add focus states that make the input borders glow with the neon theme colors (`focus:border-fuchsia-500`, `focus:ring-fuchsia-500`).
    *   **Button Animation**: Add a subtle pulse or shimmer effect to the "Attend Free Demo Class" button to make it inviting.

3.  **Refine the Left Side (Visual):**
    *   Ensure the image and text on the left side of the modal are clearly legible and don't blend into the dark background poorly.

I will modify `OfficeEnvironment.tsx` to update the modal styles.
