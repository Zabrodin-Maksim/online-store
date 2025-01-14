// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const Dashboard = ({ role }) => {
    const getWelcomeMessage = () => {
        switch (role) {
            case 'Administrator':
                return 'Jste administrátor. Zde můžete spravovat uživatele a nastavení systému.';
            case 'Seller':
                return 'Jste prodejce. Zde můžete spravovat své produkty.';
            case 'Buyer':
                return 'Jste kupující. Zde můžete prohlížet produkty a vytvářet objednávky.';
            default:
                return 'Vítejte!';
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Vítejte v internetovém obchodě!</Card.Title>
                    <Card.Text>{getWelcomeMessage()}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Dashboard;