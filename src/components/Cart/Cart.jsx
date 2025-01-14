// src/components/Cart/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Button, Container, ListGroup, Card } from 'react-bootstrap';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    const handleCheckout = () => {
        alert('Objednávka byla odeslána!');
        clearCart();
    };

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <Container className="mt-4">
            <h2>Košík</h2>
            {cartItems.length === 0 ? (
                <Card>
                    <Card.Body>
                        <Card.Text>Váš košík je prázdný.</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <>
                    <ListGroup className="mb-3">
                        {cartItems.map((item, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>{item.price} Kč</p>
                                </div>
                                <Button variant="danger" onClick={() => removeFromCart(index)}>
                                    Odstranit
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Celkem: {total} Kč</Card.Title>
                        </Card.Body>
                    </Card>
                    <Button variant="success" onClick={handleCheckout}>
                        Dokončit objednávku
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Cart;