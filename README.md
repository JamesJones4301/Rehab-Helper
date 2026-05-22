# Rehab Helper

Proverbs 31 LandSphere rehab budget helper for quick real estate repair estimates, seller age checks, budget summaries, and deal math.

## Local setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel settings

Use these settings when importing the repository into Vercel:

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Reference document

The app points to this file path:

```text
public/reference/rehab-helper-2023.xlsx
```

Add the Excel file there before final deployment if you want the download button to work in production.
