// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import UsersList from './components/Users/UsersList';
import UserDetails from './components/Users/UserDetails';
import ProductsList from './components/Products/ProductsList';
import ProductDetails from './components/Products/ProductDetails';
import ProductForm from './components/Products/ProductForm';
import Cart from './components/Cart/Cart';
import OrdersList from './components/Orders/OrdersList';
import Settings from './components/Settings/Settings';
import PrivateRoute from './components/Shared/PrivateRoute';
import CustomNavbar from './components/Shared/Navbar';

const App = () => {
    const [user, setUser] = useState(null);
    const [currentRole, setCurrentRole] = useState('');

    const handleRoleSwitch = (role) => {
        setCurrentRole(role);
    };

    // Если у пользователя есть несколько ролей, берём либо выбранную, либо первую
    const getEffectiveRole = () => {
        if (!user) return '';
        if (currentRole) return currentRole;
        if (user.roles && user.roles.length > 0) {
            return user.roles[0];
        }
        return '';
    };

    return (
        <Router>
            {/* Navbar отображается только если пользователь авторизован */}
            {user && (
                <CustomNavbar
                    user={user}
                    currentRole={getEffectiveRole()}
                    onRoleSwitch={handleRoleSwitch}
                    setUser={setUser}
                />
            )}

            <Routes>
                {/* Перенаправляем "/" -> /login или /dashboard */}
                <Route
                    path="/"
                    element={
                        user
                            ? <Navigate to="/dashboard" replace />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* Страница логина */}
                <Route
                    path="/login"
                    element={
                        !user
                            ? <Login setUser={setUser} />
                            : <Navigate to="/dashboard" replace />
                    }
                />

                {/* Главная страница после входа */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute user={user}>
                            <Dashboard role={getEffectiveRole()} />
                        </PrivateRoute>
                    }
                />

                {/* Профиль пользователя */}
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute user={user}>
                            <Profile user={user} />
                        </PrivateRoute>
                    }
                />

                {/* Список пользователей (только админ) */}
                <Route
                    path="/users"
                    element={
                        <PrivateRoute user={user} requiredRole="Administrator">
                            <UsersList />
                        </PrivateRoute>
                    }
                />

                {/* Детали пользователя (только админ) */}
                <Route
                    path="/users/:id"
                    element={
                        <PrivateRoute user={user} requiredRole="Administrator">
                            <UserDetails />
                        </PrivateRoute>
                    }
                />

                {/* Список товаров (доступно Administrator, Seller, Buyer) */}
                <Route
                    path="/products"
                    element={
                        <PrivateRoute user={user} requiredRole={['Administrator', 'Seller', 'Buyer']}>
                            <ProductsList
                                user={user}
                                currentRole={getEffectiveRole()}
                            />
                        </PrivateRoute>
                    }
                />

                {/* Добавление нового товара (только Seller) */}
                <Route
                    path="/products/new"
                    element={
                        <PrivateRoute user={user} requiredRole="Seller">
                            <ProductForm />
                        </PrivateRoute>
                    }
                />

                {/* Редактирование товара (Admin или Seller) */}
                <Route
                    path="/products/:id/edit"
                    element={
                        <PrivateRoute user={user} requiredRole={['Administrator', 'Seller']}>
                            <ProductForm />
                        </PrivateRoute>
                    }
                />

                {/* Детали товара (доступно всем авторизованным) */}
                <Route
                    path="/products/:id"
                    element={
                        <PrivateRoute user={user}>
                            <ProductDetails user={user} />
                        </PrivateRoute>
                    }
                />

                {/* Корзина (только Buyer) */}
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute user={user} requiredRole="Buyer">
                            <Cart />
                        </PrivateRoute>
                    }
                />

                {/* История заказов (только Buyer) */}
                <Route
                    path="/orders"
                    element={
                        <PrivateRoute user={user} requiredRole="Buyer">
                            <OrdersList />
                        </PrivateRoute>
                    }
                />

                {/* Настройки (только админ) */}
                <Route
                    path="/settings"
                    element={
                        <PrivateRoute user={user} requiredRole="Administrator">
                            <Settings />
                        </PrivateRoute>
                    }
                />

                {/* Любой неизвестный маршрут */}
                <Route
                    path="*"
                    element={
                        user
                            ? <Navigate to="/dashboard" replace />
                            : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;