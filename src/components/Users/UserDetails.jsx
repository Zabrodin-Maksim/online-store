// src/components/Users/UserDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Container, Table } from 'react-bootstrap';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedRoles, setEditedRoles] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/users/${id}`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Chyba při načítání uživatele');
                }
                return resp.json();
            })
            .then(data => {
                setUser(data);
                setEditedRoles(data.roles);
            })
            .catch(err => console.error('Chyba:', err));
    }, [id]);

    const handleSave = () => {
        fetch(`http://localhost:3001/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roles: editedRoles })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Chyba při ukládání rolí');
                }
                return resp.json();
            })
            .then(updatedUser => {
                setUser(updatedUser);
                alert('Role uživatele byly aktualizovány!');
                setShowEditModal(false);
            })
            .catch(err => console.error('Chyba:', err));
    };

    if (!user) return <div>Načítání...</div>;

    return (
        <Container className="mt-4">
            <h2>Podrobnosti o uživateli</h2>
            <Table bordered responsive>
                <tbody>
                <tr>
                    <th>ID</th>
                    <td>{user.id}</td>
                </tr>
                <tr>
                    <th>Uživatelské jméno</th>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <th>Role</th>
                    <td>{user.roles.join(', ')}</td>
                </tr>
                </tbody>
            </Table>
            <Button variant="secondary" onClick={() => setShowEditModal(true)}>
                Upravit
            </Button>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Úprava rolí</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="rolesSelect">
                            <Form.Label>Role uživatele</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                value={editedRoles}
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                    setEditedRoles(selected);
                                }}
                            >
                                <option value="Administrator">Administrator</option>
                                <option value="Seller">Seller</option>
                                <option value="Buyer">Buyer</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Vyberte role uživatele.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Zavřít
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Uložit změny
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserDetails;