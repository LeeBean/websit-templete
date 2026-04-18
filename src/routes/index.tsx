import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Spin } from 'antd';
import { useAuthStore } from '@/store/useAuthStore';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home/index'));
const Repair = lazy(() => import('@/pages/Repair/index'));
const Consultation = lazy(() => import('@/pages/Consultation/index'));
const Mall = lazy(() => import('@/pages/Mall/index'));
const ProductDetail = lazy(() => import('@/pages/Mall/ProductDetail'));
const Join = lazy(() => import('@/pages/Join/index'));
const Complaint = lazy(() => import('@/pages/Complaint/index'));
const Profile = lazy(() => import('@/pages/Profile/index'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy/index'));
const ServiceAgreement = lazy(() => import('@/pages/ServiceAgreement/index'));

// Loading component
const PageLoading = () => (
  <div className="flex justify-center items-center h-[calc(100vh-200px)]">
    <Spin size="large" />
  </div>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, setShowLoginModal } = useAuthStore();
  
  if (!isLoggedIn) {
    setShowLoginModal(true);
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'repair',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <Repair />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'consultation/*',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <Consultation />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'mall',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Mall />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<PageLoading />}>
                <ProductDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'join',
        element: (
          <Suspense fallback={<PageLoading />}>
            <Join />
          </Suspense>
        ),
      },
      {
        path: 'complaint',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <Complaint />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<PageLoading />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: 'service-agreement',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ServiceAgreement />
          </Suspense>
        ),
      },
      {
        path: 'profile/*',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoading />}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
