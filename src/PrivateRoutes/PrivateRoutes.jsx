import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

export default function PrivateRoutes() {
  const location = useLocation();
  const { admin } = useAuthContext();

  if (admin === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return admin?
}
