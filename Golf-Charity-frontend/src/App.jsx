import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./components/GlobalStyle";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { HomePage } from "./pages/HomePage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { CharitiesPage } from "./pages/CharitiesPage";
import { CharityDetailPage } from "./pages/CharityDetailPage";
import { PricingPage } from "./pages/PricingPage";

import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ScoresPage } from "./pages/ScoresPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { MyCharityPage } from "./pages/MyCharityPage";
import { DrawParticipationPage } from "./pages/DrawParticipationPage";
import { WinningsPage } from "./pages/WinningsPage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { PaymentFailurePage } from "./pages/PaymentFailurePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";

import "./App.css";

export default function App() {
  const [selectedCharity, setSelectedCharity] = useState(null);

  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar page="home" />
              <HomePage setSelectedCharity={setSelectedCharity} />
            </>
          } />
          <Route path="/how-it-works" element={
             <>
               <Navbar page="how-it-works" />
               <HowItWorksPage />
             </>
          } />
          <Route path="/charities" element={
            <>
              <Navbar page="charities" />
              <CharitiesPage setSelectedCharity={setSelectedCharity} />
            </>
          } />
          <Route path="/charities/:id" element={
             <>
               <Navbar page="charities" />
               <CharityDetailPage charity={selectedCharity} />
             </>
          } />
          <Route path="/pricing" element={
             <>
               <Navbar page="pricing" />
               <PricingPage />
             </>
          } />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Dashboard Routes (Protected) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/scores" element={
            <ProtectedRoute>
              <ScoresPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/charity" element={
            <ProtectedRoute>
              <MyCharityPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/draws" element={
            <ProtectedRoute>
              <DrawParticipationPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/winnings" element={
            <ProtectedRoute>
              <WinningsPage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes effectively decoupled. Ensure server logic handles permissions */}
          {/* Payment Routes */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/failure" element={<PaymentFailurePage />} />
          
          {/* Redirect unmapped routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
