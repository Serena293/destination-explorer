import { Container } from "react-bootstrap";

const Footer = () => {
  const data = new Date();
  const year = data.getFullYear();

  return (
    <Container fluid className="bg-body-tertiary text-center">
      <p>Copyright {year}</p>
    </Container>
  );
};

export default Footer;
