import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from 'pages/Login';
import Layout from 'components/Layout';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import { AuthProvider } from 'providers/AuthContext';
import HomePage from 'pages/HomePage';
import CoworkersPage from 'pages/CoworkersPage';
import { SnackbarProvider } from 'providers/Snackbar';
import AddCoworkerPage from 'pages/CoworkersPage/subPages/AddCoworkerPage';
import EditCoworkerPage from 'pages/CoworkersPage/subPages/EditCoworkerPage';
import LoadingSpinner from 'components/LoadingSpinner';
import ClientsPage from 'pages/ClientsPage';
import AddClientPage from 'pages/ClientsPage/subPages/AddClientPage';
import EditClientPage from 'pages/ClientsPage/subPages/EditClientPage';
import ProjectsPage from 'pages/ProjectsPage';
import AddProjectPage from 'pages/ProjectsPage/subPages/AddProjectPage';
import EditProjectPage from 'pages/ProjectsPage/subPages/EditProjectPage';
import SubprojectsPage from 'pages/SubprojectsPage';
import AddSubprojectPage from 'pages/SubprojectsPage/subPages/AddSubprojectPage';
import EditSubprojectPage from 'pages/SubprojectsPage/subPages/EditSubprojectPage';
import ChangePasswordPage from 'pages/ChangePasswordPage';

const pageRoutes = [
  {
    path: '',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/change-password',
    element: <ChangePasswordPage />,
  },
  {
    path: '/coworkers',
    element: <CoworkersPage />
  },
  {
    path: '/coworkers/add',
    element: <AddCoworkerPage />
  },
  {
    path: '/coworkers/edit/:id',
    element: <EditCoworkerPage />
  },
  {
    path: '/clients',
    element: <ClientsPage />
  },
  {
    path: '/clients/add',
    element: <AddClientPage />
  },
  {
    path: '/clients/edit/:id',
    element: <EditClientPage />
  },
  {
    path: '/projects',
    element: <ProjectsPage />
  },
  {
    path: '/projects/add',
    element: <AddProjectPage />
  },
  {
    path: '/projects/edit/:id',
    element: <EditProjectPage />
  },
  {
    path: '/subprojects',
    element: <SubprojectsPage />
  },
  {
    path: '/subprojects/add',
    element: <AddSubprojectPage />
  },
  {
    path: '/subprojects/edit/:id',
    element: <EditSubprojectPage />
  },
];

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SnackbarProvider>
        <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route element={<Layout />}>
                      {pageRoutes.map((pageRoute) => (
                          <Route
                              key={`route-${pageRoute.path}`}
                              path={pageRoute.path}
                              element={pageRoute.element}
                          />
                      ))}
                  </Route>
              </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
