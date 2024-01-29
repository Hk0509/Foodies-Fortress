import React, { useState } from "react";
import "./../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-container">
      <h2 className="choose__us-title">
        Contact Us <i className="fas fa-envelope" style={{ color: "#df2020" }}></i>
      </h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name" className="feature__subtitle">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="feature__subtitle">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message" className="feature__subtitle">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="food__category">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
