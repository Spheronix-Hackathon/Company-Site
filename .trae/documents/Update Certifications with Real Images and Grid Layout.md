I will update the `Certifications.tsx` component to replace the generic icons with the actual certificate images from your assets folder.

**1. Verify Asset Availability:**
*   I checked `assets/certificates/` and found:
    *   `ISO 9001.png` (You asked for `.jpg`, but `.png` exists. I'll use `.png` to be safe, or check if I should use `.png` for better quality). *Correction*: The user explicitly asked to use `.jpg` based on their assumption, but the file system shows `.png` for most. I will use the files that **actually exist**:
        *   `ISO 9001.png`
        *   `Startup India.jpg` (or `.png` - both exist, I'll prefer `.png` if transparent, or `.jpg` as requested if consistent). Let's stick to the existing files: `Startup India.jpg` matches the request.
        *   `NSDC Partner.png` (Request said `.jpg`, but file is `.png`. I will use the existing `.png`).
        *   `ISO 29990.png` (Request said `.jpg`, but file is `.png`. I will use the existing `.png`).

**2. Import Images:**
*   I will explicitly import the images at the top of `Certifications.tsx` using relative paths (`../../../assets/certificates/...`). This handles the spaces in filenames correctly in imports.

**3. Update Component Structure:**
*   I will update the mapping logic to use these imported images.
*   I will implement the **Grid Layout** (`grid-cols-2`) as requested.
*   I will set the image height to `h-40` or `h-48` as requested.
*   I will apply `object-contain` to ensure the full certificate is visible.
*   I will add the `hover:scale-105` transition.

**Refined Plan:**
1.  Modify `pages/Training/components/Certifications.tsx`.
2.  Import `ISO 9001.png`, `Startup India.jpg`, `NSDC Partner.png`, `ISO 29990.png`.
3.  Update the rendering loop to use these images in the requested grid layout.

*Self-Correction on File Extensions*: The user asked for `.jpg` for all, but my `ls` showed `.png` for most. I will use the extensions that actually exist on the disk to ensure they load.
