// ViewUserProfile.js
import React from 'react';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';

const ViewUserProfile = ({ user }) => {
  return (
    <Card>
      <CardBody>
        <h2 className="text-uppercase">User Information</h2>
        <Container className="text-center">
          <img
            style={{ maxWidth: "250px", maxHeight: "250px" }}
            src={user.profilePicture || "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"}
            alt="user profile picture"
            className="img-fluid"
          />
        </Container>
        <Table className="text-center">
          <tbody>
            <tr>
              <td>USER_ID</td>
              <td>{user.user_id}</td>
            </tr>
            <tr>
              <td>USER_NAME</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>USER_EMAIL</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>ABOUT</td>
              <td>{user.about}</td>
            </tr>
            <tr>
              <td>ROLE</td>
              <td>
                {user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <div key={role.id}>{role.name}</div>
                  ))
                ) : (
                  <div>No roles assigned</div>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default ViewUserProfile;
