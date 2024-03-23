import Card from "react-bootstrap/Card";
import ReactBarcode from "react-barcode";
import MembershipCardImg from "../assets/images/BlockbusterMembership03.png"; // Import the MembershipCard component

function MemberCardLogIn({ username, email, paddedUsername, memberSince }) {
  return (
    <Card style={{ width: "35rem", border: "none", margin: "auto" }}>
      <Card.Img src={MembershipCardImg} alt="Membership Card" />
      <Card.ImgOverlay className="cardText">
        <Card.Title>Username: {username}</Card.Title>
        <Card.Text>
          <ReactBarcode
            value={paddedUsername.padEnd(20, ".")}
            width={1.4} // Set the width of the bars
            height={14} // Set the height of the bars
            format="CODE128" // Specify the barcode format
            displayValue={false} // Hide the human-readable text
            textPosition="none" // Hide the text completely
            background="#2556A5" // Set the background color
          />
        </Card.Text>
        <Card.Text>Member Since: {memberSince}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default MemberCardLogIn;
