import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Settings = () => {
    const [systemName, setSystemName] = useState('Internetový obchod');
    const [theme, setTheme] = useState('Světlo');

    useEffect(() => {
        // Загрузка сохранённой темы
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme === 'Tma' ? 'dark-theme' : '';
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('theme', theme); // Сохраняем тему
        document.body.className = theme === 'Tma' ? 'dark-theme' : ''; // Применяем тему
        alert('Nastavení bylo úspěšně uloženo.');
    };

    return (
        <Container className="mt-4">
            <h2>Nastavení</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Název systému</Form.Label>
                    <Form.Control
                        type="text"
                        value={systemName}
                        onChange={(e) => setSystemName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Téma</Form.Label>
                    <Form.Select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="Světlo">Světlo</option>
                        <option value="Tma">Tma</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                    Uložit nastavení
                </Button>
            </Form>
        </Container>
    );
};

export default Settings;