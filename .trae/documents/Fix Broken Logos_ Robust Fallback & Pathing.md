I will fix the issue where logos are missing. The problem is likely that the local image imports are failing (possibly due to path resolution) and the error handling isn't falling back to the Clearbit URLs, leaving broken/invisible images.

Here is the plan:

1.  **Improve Image Loading Logic in `CompanyCard`**:
    *   I will verify the image source state.
    *   If the local logo fails to load (`onError`), I will automatically fallback to the Clearbit URL (`https://logo.clearbit.com/...`).
    *   If the Clearbit URL also fails, I will then hide the image and show the text name.

2.  **Fix Import Path**:
    *   I will change the `import.meta.glob` pattern from using the alias `@/assets/...` to a relative path `../../../assets/company_logos/*.{png,jpg}`. This is often more reliable for Vite's static analysis to correctly map the files.

3.  **Refine Path Matching**:
    *   I will update the `getLogoPath` regex to be more flexible in matching the keys returned by the relative glob import.

This ensures that even if a local file is missing or fails to load, the user will still see the Clearbit logo instead of empty space, solving the "all gone" issue.
