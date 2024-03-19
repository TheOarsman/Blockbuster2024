import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import '../searchMovies.css';

const StarIcon = ({ onClick }) => {
  const [isStarred, setIsStarred] = useState(false);

  const handleClick = () => {
    setIsStarred(!isStarred);
    onClick();
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