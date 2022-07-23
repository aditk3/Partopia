import { Link } from "react-router-dom";

export function Welcome() {
    return(
        <div>
        <p className="explore-side">Partopia</p>
        <p className="explore-desc">
          A platform to share public parties and events.
        </p>
        <Link className="explore-button" to="/">Explore</Link>
      </div>
    );
}