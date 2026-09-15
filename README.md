# SkinCare Check

A skin disease detection and consultation website built with React, Vite, and Tailwind CSS. Get informational insights about common skin conditions and when to seek professional help.

## Features

- **Scan Your Skin** – Upload or capture a photo for AI-style analysis (mock results; replace with real API later)
- **Search Conditions** – Search by condition name for symptoms, causes, and care tips
- **Clean navigation** – Home, Scan, Search, About
- **Medical disclaimers** on every page
- **Responsive design** – Mobile-friendly with soft beige/pink palette

## Tech Stack

- React 18 + Vite 5
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Python

## Run Locally

```bash
cd skin-care-app-main
npm install
npm run dev
http://localhost:5173/
```


## Build

```bash
npm run build
npm run preview   # preview production build
```

## Project Structure

```
src/
  components/   Header, Footer, ImageUpload, SearchBar, ResultsCard, Disclaimer
  pages/       Home, Scan, Search, About
  data/        skinConditions.json (15 conditions)
  App.jsx, main.jsx, index.css
```

## Disclaimer

This tool is for informational purposes only and does not replace professional medical advice. Always consult a qualified healthcare provider.
