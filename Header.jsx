import { Clapperboard, Bookmark } from "lucide-react";

export default function Header({ watchlistCount, activeView, onViewChange }) {
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="ReelNest home">
        <span className="brand-mark"><Clapperboard size={21} /></span>
        <span>reel<span className="brand-accent">nest</span><small>YOUR CINEMA UNIVERSE</small></span>
      </a>
      <nav className="nav-actions" aria-label="Main navigation">
        <button className={`nav-link ${activeView === "discover" ? "selected" : ""}`} onClick={() => onViewChange("discover")}>Discover</button>
        <button className={`nav-link watch-nav ${activeView === "watchlist" ? "selected" : ""}`} onClick={() => onViewChange("watchlist")}>
          <Bookmark size={16} /> My Watchlist <span className="count-pill">{watchlistCount}</span>
        </button>
      </nav>
    </header>
  );
}
