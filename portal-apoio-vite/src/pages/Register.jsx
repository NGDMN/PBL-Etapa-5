import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    const success = await register(userData);
    if (success) {
      navigate('/marketplace');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h4" className="text-center">Cadastro</Card.Header>
            <Card.Body>
              <RegisterForm onSubmit={handleRegister} error={error} />
              <div className="mt-3 text-center">
                <p>
                  Já tem uma conta?{' '}
                  <Link to="/login">Faça login aqui</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register; 