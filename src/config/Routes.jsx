// routes.js

import { AuthGuard } from '../components';
import {
  HomePage,
  LoginPage,
  SignupPage,
  PostList,
  AddPost,
  EditPost,
  PostRead
} from '../pages';

// Unprotected routes
export const UN_PROTECTED_ROUTES = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: (
      <AuthGuard authentication={false}>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthGuard authentication={false}>
        <SignupPage />
      </AuthGuard>
    ),
  },
  {
    path: '/post/:slug',
    element: <PostRead />,
  }
 
];

// Protected routes
export const PROTECTED_ROUTES = [
  {
    path: '/all-posts',
    element: (
      <AuthGuard authentication>
        <PostList />
      </AuthGuard>
    ),
  },
  {
    path: '/add-post',
    element: (
      <AuthGuard authentication>
        <AddPost />
      </AuthGuard>
    ),
  },
  {
    path: '/edit-post/:slug',
    element: (
      <AuthGuard authentication>
        <EditPost />
      </AuthGuard>
    ),
  },
];
