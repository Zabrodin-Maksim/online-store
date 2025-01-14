// src/components/Profile/Profile.jsx
import React, { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';

const Profile = ({ user }) => {
    const [password, setPassword] = useState(user.password);
    const [message, setMessage] = useState('');

    const handleSave = () => {
        // Отправляем PATCH-запрос на сервер json-server
        fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Chyba při ukládání hesla');
                }
                return resp.json();
            })
            .then(updatedUser => {
                // Опционально: здесь вы можете обновить user в родительском состоянии (если требуется)
                // setUser(updatedUser);
                setMessage('Heslo bylo úspěšně změněno!');
            })
            .catch(err => {
                console.error(err);
                setMessage('Nastala chyba při změně hesla.');
            });
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Profil uživatele</Card.Title>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    <Form>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Uživatelské jméno</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.username}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSave}>
                            Uložit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;