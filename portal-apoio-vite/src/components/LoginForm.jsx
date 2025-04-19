import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const LoginForm = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would validate credentials with a backend
    // For now, we'll simulate a successful login
    login({
      id: 'user_' + Date.now(), // Generate a unique ID
      email,
      name: email.split('@')[0] // Simple way to get a name from email
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Entrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm; 