// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/users');
            if (!response.ok) {
                throw new Error('Nepodařilo se načíst uživatele');
            }
            const users = await response.json();
            const foundUser = users.find(
                (u) => u.username === username && u.password === password
            );
            if (foundUser) {
                setUser(foundUser);
                navigate('/dashboard');
            } else {
                setError('Neplatné přihlašovací údaje');
            }
        } catch (err) {
            console.error('Chyba při načítání uživatelů:', err);
            setError('Došlo k chybě. Zkuste to prosím později.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-4 text-center">Přihlášení</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Uživatelské jméno</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Zadejte uživatelské jméno"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Heslo</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Zadejte heslo"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Přihlásit se
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;