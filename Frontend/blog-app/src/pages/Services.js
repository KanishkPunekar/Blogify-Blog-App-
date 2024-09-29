import { Col, Container, Row, Card, CardBody, CardTitle, CardText } from "reactstrap";
import Base from "../Components/Base";

const Services = () => {
  const services = [
    {
      title: "Content Writing",
      description: "High-quality content creation tailored to your audience's needs."
    },
    {
      title: "SEO Optimization",
      description: "Improve your website's visibility on search engines with our SEO services."
    },
    {
      title: "Web Development",
      description: "Custom web development solutions to bring your ideas to life."
    },
    {
      title: "Social Media Management",
      description: "Manage your social media presence effectively to engage with your audience."
    },
    {
      title: "Brand Strategy",
      description: "Develop a strong brand identity and strategy that resonates with your audience."
    },
    {
      title: "Graphic Design",
      description: "Eye-catching designs for your marketing materials and online presence."
    },
    // Add more services as needed
  ];

  return (
    <Base>
      <Container className="services-container">
        <h1 className="services-title">Our Services</h1>
        <Row className="justify-content-center">
          {services.map((service, index) => (
            <Col sm="12" md="6" lg="4" className="mb-4 d-flex justify-content-center" key={index}>
              <Card className="service-card text-center">
                <CardBody>
                  <CardTitle tag="h5">{service.title}</CardTitle>
                  <CardText>{service.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Base>
  );
}

export default Services;
