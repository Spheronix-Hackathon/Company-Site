I will implement the changes to replace the company names with logos from the `company_logos` folder.

**1. Standardize Logo Filenames**
I will rename the files in `assets/company_logos/` to strict lowercase `companyname_logo.png` format to match your requested convention and ensure reliable loading.
*   `IBM LOGO.png` -> `ibm_logo.png`
*   `Accenture_logo.png` -> `accenture_logo.png`
*   `Amazon_logo.png` -> `amazon_logo.png`
*   ...and so on for all mixed-case files.
*   `Zomato_logo.jpg` -> `zomato_logo.jpg` (keeping the extension but ensuring lowercase name).

**2. Update `Partners.tsx`**
*   I will modify `pages/Training/components/Partners.tsx`.
*   I will use a dynamic import approach (using `import.meta.glob`) to automatically load all logos from `assets/company_logos/`.
*   I will map each company in the list to its corresponding logo based on the standardized name.
*   I will ensure the styling matches your requirements:
    *   **Responsive**: Images will scale correctly.
    *   **Grayscale**: Applied by default (`grayscale` class), removing on hover.
    *   **Consistent Height**: I will set a fixed height (e.g., `h-12` or `h-14`) with `object-contain`.

**Note on CRED**: The `CRED` logo appears to be missing from your `company_logos` folder. For this one, I will keep the existing fallback (Clearbit logo) so it doesn't break.
