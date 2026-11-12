import { BookmarkPlus, Check, Star } from "lucide-react";

// MovieCard receives title, genre, year and rating as required assignment props.
export default function MovieCard({ movie, isAdded, onAdd }) {
  const { title, genre, year, rating, poster, description } = movie;
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img className="poster" src={poster} alt={`${title} movie poster`}
          onError={(event) => { event.currentTarget.src = "https://placehold.co/500x750/171b29/f4f0e8?text=Movie+Poster"; }} />
        <span className="genre-tag">{genre}</span>
        <span className="rating"><Star size={13} fill="currentColor" /> {Number(rating).toFixed(1)}</span>
      </div>
      <div className="movie-info">
        <div className="movie-meta">{year} <span>•</span> {genre}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <button className={`add-button ${isAdded ? "added" : ""}`} onClick={() => onAdd(movie)} disabled={isAdded}>
          {isAdded ? <><Check size={16} /> Added</> : <><BookmarkPlus size={16} /> Add to Watchlist</>}
        </button>
      </div>
    </article>
  );
}
