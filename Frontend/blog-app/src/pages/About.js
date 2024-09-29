import React, { useContext } from "react";
import Base from "../Components/Base";
import userContext from '../context/userContext';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { FaEye, FaBullseye, FaUsers } from "react-icons/fa";

const About = () => {
  // Consume the user context
  const { user } = useContext(userContext);

  return (
    <Base>
      <Container className="about-container">
        <h1 className="about-title">About Us</h1>
        {/* Access the user's name from user.data */}
        <h2 className="welcome-message">Welcome, {user.data?.name}!</h2>
        <Row>
          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card className="about-card">
              <CardHeader className="card-header">Who We Are</CardHeader>
              <CardBody>
                <p>
                  We are a passionate team dedicated to delivering high-quality software solutions that meet our clients' needs and exceed their expectations. With a diverse skill set and a commitment to innovation, we tackle complex challenges and turn them into scalable solutions.
                </p>
                <p>
                  Our team consists of experienced developers, designers, and project managers who work together to achieve our goals.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card className="about-card">
              <CardHeader className="card-header">Our Mission</CardHeader>
              <CardBody>
                <p>
                  Our mission is to innovate and enhance the digital landscape by providing cutting-edge technologies and services. We strive to build lasting relationships with our clients by providing them with the best possible solutions tailored to their unique needs.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6" lg="4" className="mb-4">
            <Card className="about-card">
              <CardHeader className="card-header">Our Vision</CardHeader>
              <CardBody>
                <div className="vision-info">
                  <FaEye /> <span>To be a global leader in software solutions, driving innovation and efficiency for businesses worldwide.</span>
                  <br />
                  <FaBullseye /> <span>Empowering our clients to achieve their goals through our technology and expertise.</span>
                  <br />
                  <FaUsers /> <span>Fostering a collaborative and inclusive environment that inspires creativity and teamwork.</span>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm="12">
            <Card className="about-card">
              <CardHeader className="card-header">Our Values</CardHeader>
              <CardBody>
                <p>
                  We believe in integrity, excellence, and innovation. Our values guide our actions and help us create meaningful solutions.
                </p>
                <p>
                  <strong>Integrity:</strong> We conduct our business with honesty and transparency.
                </p>
                <p>
                  <strong>Excellence:</strong> We strive for the highest quality in everything we do.
                </p>
                <p>
                  <strong>Innovation:</strong> We embrace change and are always looking for new ways to improve.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default About;
