import blockbusterLogo from "../assets/images/BlockbusterOriginalLogo.png";
import "../css/ErrorPage.css"; // Import CSS file for styling

const ErrorPage = () => {
  return (
    <div
      className="error-page-container"
      style={{
        backgroundColor: "#0D2264 ",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="error-page-content">
        <img
          src={blockbusterLogo}
          alt="Blockbuster Logo"
          className="blockbuster-logo-small"
        />{" "}
        {/* Apply class for smaller size */}
        <p className="error-page-message">
          Sorry for the inconvenience, we are still working on rewinding your
          movie.
        </p>
        <a href="/" className="error-page-link">
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
