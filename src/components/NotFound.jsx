import React from 'react'
import { Link } from 'react-router-dom';
import Button from './Elements/Button';
import Container from './Container/Container';

function NotFound() {
  return  (
    <Container>
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-6">
        Oops! Page not found
      </h2>
      <p className="text-slate-500 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button classes="bg-indigo-600 hover:bg-indigo-700">
          Go Back Home
        </Button>
      </Link>
    </div>
    </Container>
  );
}

export default NotFound