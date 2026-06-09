import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("xaqdqwnv");
  if (state.succeeded) {
    return <p>Thanks for your message. We will get back to you very soon.</p>;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-4 p-4 border rounded"
      style={{ maxWidth: "500px" }}
    >
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-control"
          placeholder="name@example.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          rows="5"
          placeholder="Write your message here..."
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="btn btn-primary w-100"
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
