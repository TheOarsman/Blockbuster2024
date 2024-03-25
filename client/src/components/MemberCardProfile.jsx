import Card from "react-bootstrap/Card";
import ReactBarcode from "react-barcode";
import MembershipCardImg from "../assets/images/BlockbusterMembership03.png"; // Import the MembershipCard component

function MemberCardProfile({ username, email, paddedUsername, memberSince }) {
  return (
    <Card
      style={{
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      <Card.Img
        src={MembershipCardImg}
        alt="Membership Card"
        className="totalMemberCard"
      />
      <Card.ImgOverlay className="d-flex flex-column justify-content-center align-items-start ">
        <Card.Title className = 'username-profile'>Username: {username}</Card.Title>
        <Card.Title classname = 'email-profile'>Email: {email}</Card.Title>
        <Card.Title>Hours Watch: {"MathToBeDone!"}</Card.Title>
        <Card.Text className="d-flex justify-content-center">
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

export default MemberCardProfile;
