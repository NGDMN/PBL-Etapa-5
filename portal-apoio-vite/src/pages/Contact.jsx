import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="container my-5">
      <h2>Fale Conosco</h2>
      <p>Envie uma mensagem e responderemos o mais rápido possível!</p>
      <ContactForm />
    </div>
  );
};

export default Contact; 