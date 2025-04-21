import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Nome de usuário é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      errors.password = 'A senha deve ter pelo menos 8 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.first_name.trim()) {
      errors.first_name = 'Nome é obrigatório';
    }
    
    if (!formData.last_name.trim()) {
      errors.last_name = 'Sobrenome é obrigatório';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await onSubmit(userData);
      
      if (!result.success) {
        if (result.error) {
          // Se o erro for uma string, usa diretamente
          if (typeof result.error === 'string') {
            setValidationErrors(prev => ({
              ...prev,
              form: result.error
            }));
          } else {
            // Se for um objeto, tenta extrair mensagens específicas por campo
            const fieldErrors = {};
            Object.entries(result.error).forEach(([key, value]) => {
              if (formData.hasOwnProperty(key)) {
                fieldErrors[key] = Array.isArray(value) ? value[0] : value;
              } else {
                fieldErrors.form = fieldErrors.form 
                  ? `${fieldErrors.form}\n${key}: ${value}` 
                  : `${key}: ${value}`;
              }
            });
            
            setValidationErrors(prev => ({
              ...prev,
              ...fieldErrors
            }));
          }
        }
      }
    } catch (err) {
      console.error('Erro no registro:', err);
      setValidationErrors(prev => ({
        ...prev,
        form: 'Ocorreu um erro ao tentar registrar. Por favor, tente novamente.'
      }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {validationErrors.form && (
        <Alert variant="danger">
          {validationErrors.form}
        </Alert>
      )}
      
      <Form.Group className="mb-3">
        <Form.Label>Nome de Usuário</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          isInvalid={!!validationErrors.username}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!validationErrors.email}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          isInvalid={!!validationErrors.first_name}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.first_name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sobrenome</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          isInvalid={!!validationErrors.last_name}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.last_name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          isInvalid={!!validationErrors.password}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirmar Senha</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          isInvalid={!!validationErrors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Cadastrar
      </Button>
    </Form>
  );
};

export default RegisterForm; 