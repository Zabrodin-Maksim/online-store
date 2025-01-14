// src/components/Shared/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Form } from 'react-bootstrap';

const NavigationBar = ({ user, currentRole, onRoleSwitch, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        onRoleSwitch('');
        navigate('/login');
    };

    const changeRole = (e) => {
        onRoleSwitch(e.target.value);
        navigate('/dashboard');
    }

    // Если пользователь не авторизован, не рендерим Navbar
    if (!user) return null;

    return (
        <Navbar bg="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/dashboard">Internetový obchod</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Hlavní stránka</Nav.Link>

                        {/* Только Админ видит вкладку "Uživatelé" */}
                        {currentRole === 'Administrator' && (
                            <Nav.Link as={Link} to="/users">Uživatelé</Nav.Link>
                        )}

                        {/* Если роль Seller или Buyer -> вкладка "Produkty" */}
                        {['Seller', 'Buyer', 'Administrator'].includes(currentRole) && (
                            <Nav.Link as={Link} to="/products">Produkty</Nav.Link>
                        )}

                        {/* Если Buyer -> вкладки Košík, Objednávky */}
                        {currentRole === 'Buyer' && (
                            <>
                                <Nav.Link as={Link} to="/cart">Košík</Nav.Link>
                                <Nav.Link as={Link} to="/orders">Objednávky</Nav.Link>
                            </>
                        )}

                        <Nav.Link as={Link} to="/profile">Profil</Nav.Link>

                        {/* Настройки только для Administrator */}
                        {currentRole === 'Administrator' && (
                            <Nav.Link as={Link} to="/settings">Nastavení</Nav.Link>
                        )}
                    </Nav>

                    <Form className="d-flex align-items-center">
                        {/* Если у пользователя несколько ролей -> dropdown для переключения */}
                        {user.roles && user.roles.length > 1 && (
                            <Form.Select
                                className="me-2"
                                value={currentRole}
                                onChange={(e) => changeRole(e)}
                            >
                                {user.roles.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </Form.Select>
                        )}
                        <Button variant="outline-danger" onClick={handleLogout} className="logout-btn">
                            Odhlásit se
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;