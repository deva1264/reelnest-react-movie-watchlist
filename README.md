# ReelNest — Your Personal Cinema Universe

A responsive React movie watchlist application created for **Phase 3 · React — Assignment No. 4**.

## Features
- Reusable `MovieCard` component displaying title, genre, year and rating.
- React `useState` manages the watchlist, genre filter and search.
- Duplicate prevention: saved movies show a disabled **Added** button.
- Watchlist view supports removing saved movies.
- `useEffect` + Axios fetches the local `public/movies.json` catalogue.
- Loading spinner while the catalogue is loading.
- Genre filters and conditional **No movies found** empty state.
- Responsive dark cinematic interface.

## Tech stack
React 18 · Vite · Axios · Lucide React · CSS

## Run locally
1. Install Node.js (LTS).
2. Extract this project folder.
3. Open a terminal inside the project folder.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

To verify a production build:
```bash
npm run build
```

## Project structure
```text
ReelNest-React-Movie-Watchlist/
├── public/
│   └── movies.json
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── MovieCard.jsx
│   │   └── Watchlist.jsx
│   ├── data/
│   │   └── movieFallback.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Assignment submission details
- Learner Name: Devadharshini V
- Batch Code: **[Enter your exact batch code]**
- Assignment: Assignment No. 4 — Build a Movie Watchlist App with React
- Suggested GitHub repository: `reelnest-react-movie-watchlist`

## GitHub upload
Create a new **public** repository named `reelnest-react-movie-watchlist`. Upload the contents of this folder (not the ZIP file itself), keeping the folder structure intact. Copy the repository URL into your Google Doc.

## Requirement mapping
| Assignment requirement | Implementation |
|---|---|
| MovieCard with title, genre, year, rating props | `src/components/MovieCard.jsx` |
| useState watchlist + add/remove | `src/App.jsx`, `Watchlist.jsx` |
| Duplicate prevention + disabled Added button | `addToWatchlist` in `src/App.jsx` |
| useEffect + Axios + loading spinner | `src/App.jsx`, `Loader.jsx` |
| Genre filter + No movies found | `src/App.jsx` |
| Separate components, no direct state mutation | `src/components/` and functional state updates |

## Notes
Movie data is loaded from a local JSON file using Axios. Poster artwork is loaded from remote image URLs, so an internet connection is needed for poster images. The app itself has fallback movie data if the local catalogue request fails.
