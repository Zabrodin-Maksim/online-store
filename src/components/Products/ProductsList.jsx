// src/components/Products/ProductsList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';

const ProductsList = ({ user, currentRole }) => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch('http://localhost:3001/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Chyba při načítání produktů');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(err => console.error('Chyba:', err));
    }, [currentRole]);

    const filtered = products.filter(
        product => filter === '' || product.category === filter
    );

    return (
        <Container className="mt-4">
            <h2>Produkty</h2>
            <div className="mb-3 d-flex justify-content-between">
                <div>
                    <Form.Label>Filtr podle kategorie:</Form.Label>
                    <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Vše</option>
                        <option value="Elektronika">Elektronika</option>
                        <option value="Počítače">Počítače</option>
                        <option value="Příslušenství">Příslušenství</option>
                    </Form.Select>
                </div>
                {currentRole === 'Seller' && (
                    <Button as={Link} to="/products/new" variant="success">
                        Přidat nový produkt
                    </Button>
                )}
            </div>
            <Row>
                {filtered.map(product => (
                    <Col md={4} className="mb-4" key={product.id}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={product.image} alt={product.name} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text><strong>Cena:</strong> {product.price} Kč</Card.Text>
                                <div className="mt-auto d-flex justify-content-between">
                                    <Button as={Link} to={`/products/${product.id}`} variant="primary">
                                        Více informací
                                    </Button>
                                    {currentRole === 'Buyer' && (
                                        <Button variant="success" onClick={() => addToCart(product)}>
                                            Do košíku
                                        </Button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductsList;