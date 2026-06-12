import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useShortlist } from "../context/ShortlistContext";

function CustomNavbar() {
  const { savedDestinationIds } = useShortlist();

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Destination Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/ourdestinations">
              Our Destinations
            </Nav.Link>
            <Nav.Link as={NavLink} to="/bespoke">
              Bespoke Trip
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={NavLink}
              to="/shortlist"
              className="navbar-shortlist-link"
              aria-label={`Shortlist with ${savedDestinationIds.length} saved destinations`}
            >
              <span>Shortlist</span>
              <span className="badge text-bg-secondary mx-1">
                {savedDestinationIds.length}
              </span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
