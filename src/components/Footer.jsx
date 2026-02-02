import { Container } from "react-bootstrap";

const Footer = () => {
  const data = new Date();
  const year = data.getFullYear();

  return (
    <Container fluid className="bg-primary text-center align-content-center">
      <p>Copyright {year}</p>
    </Container>
  );
};

export default Footer;
