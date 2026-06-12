import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="py-4">
        <div className="site-footer-main">
          <div>
            <Link className="site-footer-brand" to="/">
              Destination Explorer
            </Link>
            <p className="mb-0">
              A React travel discovery project for exploring, saving, and
              planning trips.
            </p>
          </div>

          <nav className="site-footer-links" aria-label="Footer navigation">
            <Link to="/ourdestinations">Destinations</Link>
            <Link to="/shortlist">Shortlist</Link>
            <Link to="/bespoke">Bespoke trip</Link>
            <a
              href="https://github.com/Serena293/destination-explorer"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-github" aria-hidden="true" />
              GitHub
            </a>
          </nav>
        </div>

        <div className="site-footer-meta">
          <span>Built with React and Vite.</span>
          <span>© {year} Destination Explorer</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
