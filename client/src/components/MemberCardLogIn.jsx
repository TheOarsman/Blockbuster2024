import Card from "react-bootstrap/Card";
import ReactBarcode from "react-barcode";
import MembershipCardImg from "../assets/images/BlockbusterMembership03.png"; // Import the MembershipCard component

function MemberCardLogIn({ username, paddedUsername, memberSince }) {
  return (
    <div className="d-flex flex-column">
      <Card style={{ width: "100%", border: "none", margin: "auto" }}>
        <Card.Img src={MembershipCardImg} alt="Membership Card" />
        <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-center cardText">
          <div className = 'username-container'>
          <Card.Title className = 'username'>Username: {username}</Card.Title>
          </div>
         <div className="barcode-container">
          <div className = 'barcode'>
            <ReactBarcode
              value={paddedUsername.padEnd(20, ".")}
              width={1.0}// Set the width of the bars
              height={14} // Set the height of the bars
              format="CODE128" // Specify the barcode format
              displayValue={false} // Hide the human-readable text
              textPosition="none" // Hide the text completely
              background="#2556A5" // Set the background color
            />
            </div>
          </div>
          <div className = 'memberSince-container'>
          <Card.Text className="memberSince">Member Since: {memberSince}</Card.Text>
          </div>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}

export default MemberCardLogIn;
