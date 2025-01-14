// src/components/Users/UsersList.jsx
import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Chyba při načítání uživatelů');
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(err => console.error('Chyba:', err));
    }, []);

    return (
        <Container className="mt-4">
            <h2>Seznam uživatelů</h2>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Uživatelské jméno</th>
                    <th>Role</th>
                    <th>Akce</th>
                </tr>
                </thead>
                <tbody>
                {users.map(u => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.roles.join(', ')}</td>
                        <td>
                            <Button as={Link} to={`/users/${u.id}`} variant="primary" size="sm">
                                Více informací
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UsersList;