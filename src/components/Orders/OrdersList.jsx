// src/components/Orders/OrdersList.jsx
import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Card } from 'react-bootstrap';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Můžete číst z http://localhost:3001/orders a zobrazit reálné objednávky
        // Zde pro příklad statická data
        const sampleOrders = [
            {
                id: 1,
                items: ['Smartphone X', 'Sluchátka Z'],
                total: 65000,
                date: '2025-01-01'
            },
            {
                id: 2,
                items: ['Notebook Pro'],
                total: 120000,
                date: '2025-01-05'
            }
        ];
        setOrders(sampleOrders);
    }, []);

    return (
        <Container className="mt-4">
            <h2>Historie objednávek</h2>
            {orders.length === 0 ? (
                <Card>
                    <Card.Body>
                        <Card.Text>Nemáte žádné objednávky.</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {orders.map(order => (
                        <ListGroup.Item key={order.id}>
                            <strong>Objednávka #{order.id}</strong> - {order.date}
                            <br />
                            <strong>Produkty:</strong> {order.items.join(', ')}
                            <br />
                            <strong>Celkem:</strong> {order.total} Kč
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};

export default OrdersList;