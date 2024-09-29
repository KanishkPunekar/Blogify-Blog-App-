// ProfileInfo.js
import React, { useContext, useEffect, useState } from 'react';
import Base from '../../Components/Base';
import userContext from '../../context/userContext';
import { useParams } from 'react-router-dom';
import { getUser } from '../../Services/user-service';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import ViewUserProfile from '../../Components/ViewUserProfile';

function ProfileInfo() {
  const object = useContext(userContext);
  const [user, setUser] = useState(null);
  const { user_id } = useParams();

  useEffect(() => {
    getUser(user_id)
      .then(data => {
        setUser({ ...data });
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [user_id]);

  const userView = () => {
    if (!user) {
      return <div>Loading...</div>; // Show a loading message while fetching data
    }

    return (
      <Row className="justify-content-center"> {/* Center the column */}
        <Col md="6">
          <ViewUserProfile user={user} />
        </Col>
      </Row>
    );
  };

  return (
    <Base>
      <Container className="profile-container">
        {userView()}
      </Container>
    </Base>
  );
}

export default ProfileInfo;
