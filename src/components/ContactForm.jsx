import { useForm, ValidationError } from "@formspree/react";
import { Link } from "react-router-dom";

function ContactForm() {
  const [state, handleSubmit] = useForm("xaqdqwnv");

  if (state.succeeded) {
    return (
      <section className="contact-page">
        <div className="container contact-success" role="status">
          <i className="bi bi-check-circle" aria-hidden="true" />
          <p className="contact-kicker">Message sent</p>
          <h1>Thanks for getting in touch</h1>
          <p>
            Your message has arrived safely. We will get back to you as soon as
            possible.
          </p>
          <Link className="btn btn-primary" to="/">
            Return home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-page">
      <div className="container contact-layout">
        <div className="contact-intro">
          <p className="contact-kicker">Contact</p>
          <h1>Let&apos;s talk about your next trip</h1>
          <p className="contact-lead">
            Have a question about a destination or need help shaping an idea?
            Send us a message and tell us what you have in mind.
          </p>

          <div className="contact-options">
            <div>
              <i className="bi bi-globe2" aria-hidden="true" />
              <span>
                <strong>Planning a journey?</strong>
                Use the bespoke planner to share dates, budget and interests.
              </span>
            </div>
            <div>
              <i className="bi bi-compass" aria-hidden="true" />
              <span>
                <strong>Still exploring?</strong>
                Browse the destination catalogue and build your shortlist.
              </span>
            </div>
          </div>

          <div className="contact-links">
            <Link to="/bespoke">Open bespoke planner</Link>
            <Link to="/ourdestinations">Browse destinations</Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="contact-form-heading">
            <h2>Send a message</h2>
            <p>All fields are required.</p>
          </div>

          <div className="mb-3">
            <label htmlFor="contact-name" className="form-label">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              className="form-control"
              autoComplete="name"
              required
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="contact-form-error"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contact-email" className="form-label">
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              className="form-control"
              autoComplete="email"
              placeholder="name@example.com"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="contact-form-error"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contact-subject" className="form-label">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              className="form-control"
              required
            />
            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
              className="contact-form-error"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact-message" className="form-label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="form-control"
              rows="6"
              placeholder="Tell us how we can help..."
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="contact-form-error"
            />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            className="btn btn-primary contact-submit-button"
          >
            <i className="bi bi-send" aria-hidden="true" />
            {state.submitting ? "Sending..." : "Send message"}
          </button>

          <ValidationError
            errors={state.errors}
            className="contact-form-error mt-3"
          />
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
