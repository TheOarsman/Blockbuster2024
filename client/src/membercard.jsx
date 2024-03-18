import React from "react";
import useState from "NeedsToBeMade";
import "./MembershipCard.css"; // Import CSS file for styling

const MembershipCard = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    movieHoursWatched: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Generate UPC based on username
  const generateUPC = () => {
    // UPC generation logic here
    const hash = username
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((acc, val) => acc + val, 0);

    return String(hash).padStart(12, "0");
  };

  const userUPC = generateUPC(userInfo.username);

  return (
    <div className="membership-card">
      <h2>Membership Card</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Movie Hours Watched:</label>
        <input
          type="text"
          name="movieHoursWatched"
          value={userInfo.movieHoursWatched}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>UPC:</label>
        <span>{generateUPC()}</span>
      </div>
    </div>
  );
};

export default MembershipCard;
