import Card from "react-bootstrap/Card";
import ReactBarcode from "react-barcode";

// Import the MembershipCard component
import MembershipCardImg from "../assets/images/BlockbusterMembership03.png";

function MemberCardSignUp({ username, email, paddedUsername, memberSince }) {
  return (
    <div className="d-flex flex-column">
      <Card
        style={{
          width: "100%",
          border: "none",
          margin: "auto",
          background: "transparent",
        }}
      >
        <Card.Img src={MembershipCardImg} alt="Membership Card" />
        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center cardText">
          <div className="username-container">
            <Card.Title className="username">Username: {username}</Card.Title>
          </div>

          <div className="email-container">
            <Card.Title className="email">Email: {email}</Card.Title>
          </div>

          <div className="memberSince-container">
            <Card.Text className="memberSince">
              Member Since: {memberSince}
            </Card.Text>
          </div>

          <div className="barcode-container">
            <div className="barcode">
              <ReactBarcode
                value={paddedUsername.padEnd(20, ".")}
                width={1.0}               // Set bar width
                height={14}               // Set bar height
                format="CODE128"          // Specify barcode format
                displayValue={false}      // Hide human-readable text
                textPosition="none"       // Hide text completely
                background="transparent"  // Set background color
              />
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default MemberCardSignUp;
