// src/components/Products/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        if (id) {
            // Редактирование
            fetch(`http://localhost:3001/products/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Chyba při načítání produktu');
                    }
                    return response.json();
                })
                .then(found => {
                    setProduct(found);
                })
                .catch(err => console.error('Chyba:', err));
        }
    }, [id]);

    const handleChange = (e) => {
        setProduct(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            // PATCH или PUT
            fetch(`http://localhost:3001/products/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Chyba při aktualizaci produktu');
                    }
                    return resp.json();
                })
                .then(updated => {
                    alert('Produkt byl aktualizován!');
                    navigate('/products');
                })
                .catch(err => console.error('Chyba:', err));
        } else {
            // Создание нового
            const newProduct = { ...product };
            // id может генерировать json-server автоматически
            fetch('http://localhost:3001/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('Chyba při přidávání produktu');
                    }
                    return resp.json();
                })
                .then(created => {
                    alert('Produkt byl přidán!');
                    navigate('/products');
                })
                .catch(err => console.error('Chyba:', err));
        }
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>{id ? 'Upravit produkt' : 'Přidat nový produkt'}</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formProductName">
                            <Form.Label>Název</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Zadejte název produktu"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductDescription">
                            <Form.Label>Popis</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Zadejte popis produktu"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductPrice">
                            <Form.Label>Cena</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Zadejte cenu produktu"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductCategory">
                            <Form.Label>Kategorie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Zadejte kategorii produktu"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductImage">
                            <Form.Label>Obrázek (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Zadejte URL obrázku"
                                name="image"
                                value={product.image}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {id ? 'Uložit změny' : 'Přidat produkt'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductForm;