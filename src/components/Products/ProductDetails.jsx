// src/components/Products/ProductDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Image } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';

const ProductDetails = ({ user }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`http://localhost:3001/products/${id}`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Chyba při načítání produktu');
                }
                return resp.json();
            })
            .then(foundProduct => {
                setProduct(foundProduct);
            })
            .catch(err => console.error('Chyba:', err));
    }, [id]);

    if (!product) return <div>Načítání...</div>;

    return (
        <Container className="mt-4">
            <h2>{product.name}</h2>
            <Image src={product.image} alt={product.name} fluid className="mb-3" />
            <p><strong>Popis:</strong> {product.description}</p>
            <p><strong>Kategorie:</strong> {product.category}</p>
            <p><strong>Cena:</strong> {product.price} Kč</p>
            <div className="d-flex">
                {user && user.roles.includes('Buyer') && (
                    <Button variant="success" onClick={() => addToCart(product)}>
                        Přidat do košíku
                    </Button>
                )}
                {(user && (user.roles.includes('Administrator') || user.roles.includes('Seller'))) && (
                    <Button as={Link} to={`/products/${product.id}/edit`} variant="warning" className="ms-2">
                        Upravit
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default ProductDetails;