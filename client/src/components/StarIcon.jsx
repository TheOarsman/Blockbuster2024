import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "../searchMovies.css";
import PropTypes from 'prop-types';
import Auth from '../utils/auth';

const StarIcon = ({ onClick }) => {
  const [isStarred, setIsStarred] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());

  const handleClick = () => {
    if (isLoggedIn) {
      setIsStarred(!isStarred);
      onClick();
      console.log(`Movie ${isStarred ? 'removed from' : 'added to'} favorites`);
    } else {
      alert(
        "You are not logged in. Try logging in to start a favorite movie collection."
      );
    }
  };

  return (
    <i
      className="fas fa-star star-icon"
      style={{ color: isStarred ? "yellow" : "black" }}
      onClick={handleClick}
    ></i>
  );
};

StarIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default StarIcon;

