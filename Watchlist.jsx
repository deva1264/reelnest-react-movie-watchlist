import { Bookmark, Clapperboard, Star, Trash2 } from "lucide-react";

export default function Watchlist({ movies, onRemove, onDiscover }) {
  if (movies.length === 0) {
    return (
      <section className="empty-state">
        <div className="empty-icon"><Bookmark size={30} /></div>
        <h2>Your watchlist is waiting</h2>
        <p>Save the films you want to watch. Your next movie night starts here.</p>
        <button className="primary-button" onClick={onDiscover}><Clapperboard size={16} /> Explore movies</button>
      </section>
    );
  }
  return (
    <section className="watchlist-grid">
      {movies.map((movie) => (
        <article className="saved-card" key={movie.id}>
          <img src={movie.poster} alt={`${movie.title} poster`}
            onError={(event) => { event.currentTarget.src = "https://placehold.co/160x220/171b29/f4f0e8?text=Poster"; }} />
          <div className="saved-details">
            <span className="movie-meta">{movie.year} · {movie.genre}</span>
            <h3>{movie.title}</h3>
            <span className="saved-rating"><Star size={13} fill="currentColor" /> {Number(movie.rating).toFixed(1)} / 10</span>
            <button className="remove-button" onClick={() => onRemove(movie.id)}><Trash2 size={14} /> Remove</button>
          </div>
        </article>
      ))}
    </section>
  );
}
