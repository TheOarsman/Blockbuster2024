import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";
import blockbusterTotalaccess from "../assets/images/BlockBusterTotalAccess.png";
import MemberCard from "../components/MemberCard";
import { QUERY_MOVIE } from "../utils/queries";

const Profile = () => {
  // Define useState and useEffect at the top
  const [paddedUsername, setPaddedUsername] = useState("");
  const [userData, setUserData] = useState({});

  // Fetch data with useQuery
  const { loading, data } = useQuery(QUERY_MOVIE);

  // useEffect for handling data and generating padded username
  useEffect(() => {
    if (!loading && data) {
      setUserData(data?.me || {});
      setPaddedUsername(
        data?.me?.username ? data.me.username.padEnd(20, ".") : ""
      );
    }
  }, [loading, data]);

  // sets the "User Since" date on MemberCard
  const memberSince = new Date(Date.now()).toLocaleDateString();

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="home-container align-items-center">
      <Row className="img-header-row">
        <Col className="justify-content-center">
          <img
            src={blockbusterTotalaccess}
            alt="Vintage Logo"
            style={{ width: "30%" }}
          />
          <div className="membership-card">
            <MemberCard
              username={userData.username}
              email="me@example.com"
              paddedUsername={paddedUsername}
              memberSince={memberSince}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
