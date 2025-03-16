import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { submitForm } from '../services/api';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  const [charCount, setCharCount] = useState(0);

  const renderTooltip = (text) => (
    <Tooltip>{text}</Tooltip>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'mensagem') {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validações
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+ [A-Za-zÀ-ÖØ-öø-ÿ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nomeRegex.test(formData.nome)) {
      alert('Por favor, insira seu nome completo (incluindo sobrenome).');
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    if (formData.mensagem.length < 30 || formData.mensagem.length > 500) {
      alert('A sua mensagem deve ter entre 30 e 500 caracteres.');
      return;
    }

    if (formData.mensagem.includes(';')) {
      alert('A mensagem não pode conter o caractere ponto e vírgula (;).');
      return;
    }

    try {
      const response = await submitForm(formData);
      if (response.success) {
        alert(response.message);
        setFormData({ nome: '', email: '', mensagem: '' });
        setCharCount(0);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar a mensagem.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <div className="form-group mb-3">
        <label htmlFor="nome" className="d-flex align-items-center">
          Nome Completo
          <OverlayTrigger
            placement="right"
            overlay={renderTooltip("Digite seu nome completo (nome e sobrenome)")}
          >
            <span className="ms-2">
              <FontAwesomeIcon 
                icon={faInfoCircle} 
                className="text-primary" 
              />
            </span>
          </OverlayTrigger>
        </label>
        <input
          type="text"
          className="form-control"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="email" className="d-flex align-items-center">
          E-mail
          <OverlayTrigger
            placement="right"
            overlay={renderTooltip("Digite um e-mail válido (exemplo@dominio.com)")}
          >
            <span className="ms-2">
              <FontAwesomeIcon 
                icon={faInfoCircle} 
                className="text-primary" 
              />
            </span>
          </OverlayTrigger>
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="mensagem" className="d-flex align-items-center">
          Descrição da Mensagem
          <OverlayTrigger
            placement="right"
            overlay={renderTooltip("A mensagem deve ter entre 30 e 500 caracteres e não pode conter ';'")}
          >
            <span className="ms-2">
              <FontAwesomeIcon 
                icon={faInfoCircle} 
                className="text-primary" 
              />
            </span>
          </OverlayTrigger>
        </label>
        <textarea
          className="form-control"
          id="mensagem"
          name="mensagem"
          rows="5"
          value={formData.mensagem}
          onChange={handleChange}
          required
        />
        <small className="form-text text-muted">{charCount}/500 caracteres</small>
      </div>

      <button type="submit" className="btn btn-primary">
        Enviar Mensagem
      </button>
    </form>
  );
};

export default ContactForm; 