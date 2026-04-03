import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GlobalStyle } from './components/GlobalStyle';

import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { DrawManagementPage } from './pages/DrawManagementPage';
import { CharityManagementPage } from './pages/CharityManagementPage';
import { PayoutManagementPage } from './pages/PayoutManagementPage';
import { SubscriptionsManagementPage } from './pages/SubscriptionsManagementPage';

import './index.css';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRole="admin">
              <UserManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/draws" element={
            <ProtectedRoute requiredRole="admin">
              <DrawManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/charities" element={
            <ProtectedRoute requiredRole="admin">
              <CharityManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/payouts" element={
            <ProtectedRoute requiredRole="admin">
              <PayoutManagementPage />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/subscriptions" element={
            <ProtectedRoute requiredRole="admin">
              <SubscriptionsManagementPage />
            </ProtectedRoute>
          } />
          
          {/* Catch all to admin or login */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
