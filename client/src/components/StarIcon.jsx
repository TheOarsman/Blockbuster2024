import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '../searchMovies.css';

const StarIcon = ({ onClick, isLoggedIn }) => {
  const [isStarred, setIsStarred] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      setIsStarred(!isStarred);
      onClick();
    } else {
      alert('You are not logged in. Try logging in to start a favorite movie collection.');
    }
  };

  return (
    <i
      className="fas fa-star star-icon"
      style={{ color: isStarred ? 'yellow' : 'black' }}
      onClick={handleClick}
    ></i>
  );
};

export default StarIcon;