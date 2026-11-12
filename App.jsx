import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Clapperboard, Search, Film, Sparkles } from "lucide-react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import Loader from "./components/Loader";
import { fallbackMovies } from "./data/movieFallback";

const GENRES = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Thriller", "Romance"];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("discover");

  // Axios + useEffect: load the local movie catalogue when the app first mounts.
  useEffect(() => {
    let isMounted = true;
    const loadMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/movies.json");
        if (isMounted) setMovies(response.data);
      } catch (requestError) {
        if (isMounted) {
          setMovies(fallbackMovies);
          setError("Using our backup collection because the local catalogue could not be loaded.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadMovies();
    return () => { isMounted = false; };
  }, []);

  const filteredMovies = useMemo(() => movies.filter((movie) => {
    const matchesGenre = genre === "All" || movie.genre === genre;
    const matchesSearch = movie.title.toLowerCase().includes(search.trim().toLowerCase());
    return matchesGenre && matchesSearch;
  }), [movies, genre, search]);

  // Functional state updates avoid direct mutation and prevent duplicate movies.
  const addToWatchlist = (movie) => {
    setWatchlist((current) => current.some((item) => item.id === movie.id) ? current : [...current, movie]);
  };
  const removeFromWatchlist = (movieId) => {
    setWatchlist((current) => current.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="app-shell">
      <Header watchlistCount={watchlist.length} activeView={activeView} onViewChange={setActiveView} />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> A LITTLE MAGIC, ONE MOVIE AT A TIME</div>
            <h1>Stories worth<br /><em>staying in for.</em></h1>
            <p>Your personal space to discover great films and collect the ones you never want to forget.</p>
            <button className="hero-button" onClick={() => { setActiveView("discover"); document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" }); }}>
              <Clapperboard size={17} /> Explore the collection
            </button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="hero-poster hero-poster-back"><span>THE ART OF</span><b>STORY</b></div>
            <div className="hero-poster hero-poster-front"><span>YOUR NEXT</span><b>FAVOURITE<br />FILM</b><small>IS WAITING</small></div>
            <div className="hero-spark">✦</div>
          </div>
          <div className="hero-foot"><span>01 / DISCOVER</span><span>CURATED FOR YOUR NEXT MOVIE NIGHT</span></div>
        </section>

        <section className="catalogue-section" id="catalogue">
          {activeView === "discover" ? (
            <>
              <div className="section-heading">
                <div><span className="section-kicker">THE COLLECTION</span><h2>Find your <em>next watch.</em></h2></div>
                <div className="catalogue-total"><strong>{movies.length.toString().padStart(2, "0")}</strong><span>FILMS TO EXPLORE</span></div>
              </div>
              <div className="toolbar">
                <div className="genre-tabs" aria-label="Filter by genre">
                  {GENRES.map((item) => <button key={item} className={genre === item ? "genre-active" : ""} onClick={() => setGenre(item)}>{item}</button>)}
                </div>
                <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a movie…" aria-label="Search movies" /></label>
              </div>
              {error && <p className="notice">{error}</p>}
              {loading ? <Loader /> : filteredMovies.length > 0 ? (
                <div className="movie-grid">
                  {filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} isAdded={watchlist.some((item) => item.id === movie.id)} onAdd={addToWatchlist} />)}
                </div>
              ) : (
                <div className="no-results"><Film size={28} /><h3>No movies found</h3><p>Try another title or choose a different genre.</p><button onClick={() => { setGenre("All"); setSearch(""); }}>Clear filters</button></div>
              )}
            </>
          ) : (
            <>
              <div className="section-heading">
                <div><span className="section-kicker">SAVED FOR LATER</span><h2>Your <em>watchlist.</em></h2></div>
                <div className="catalogue-total"><strong>{watchlist.length.toString().padStart(2, "0")}</strong><span>YOUR PICKS</span></div>
              </div>
              <Watchlist movies={watchlist} onRemove={removeFromWatchlist} onDiscover={() => setActiveView("discover")} />
            </>
          )}
        </section>
      </main>
      <footer className="footer"><a className="footer-brand" href="#"><Clapperboard size={17} /> ReelNest</a><span>MADE FOR THE LOVE OF STORIES</span><span>© 2026 REELNEST</span></footer>
    </div>
  );
}
