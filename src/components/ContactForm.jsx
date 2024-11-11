"use client"
import React, { useState, useRef } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import Link from 'next/link';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const form = useRef(); // Agregar el ref al formulario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault(); // Asegúrate de prevenir el comportamiento predeterminado del formulario

    // Usar el formulario con el ref para enviarlo con emailjs
    emailjs
      .sendForm('service_ioxau8m', 'template_edm8etj', form.current, {
        publicKey: 'b9SxurV8m-1Pi5Mkl',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('¡Mensaje enviado!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Hubo un error al enviar el mensaje.');
        }
      );
  };

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 min-h-[100vh] flex justify-center items-center">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Contáctanos</h2>
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-center text-gray-700">
            Envíanos un mensaje directo a nuestro WhatsApp:
          </h2>
          <Link href="https://wa.link/9tmqpf">
            <FaWhatsapp className="text-green-500 text-[3rem] px-2" />
          </Link>
        </div>

        <p className="text-center text-gray-700 mb-8">
          o si tienes alguna pregunta o comentario, no dudes en enviarnos un mail. ¡Estamos aquí para ayudarte!
        </p>
        <form ref={form} onSubmit={sendEmail} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
            <input
              type="text"
              id="name"
              name="user_name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="user_email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
