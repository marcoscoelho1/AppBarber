import React from 'react';
import { useSelector } from 'react-redux';
import createRouter from './routes';

export default function App() {
  const auth = useSelector(state => state.auth.data);

  const { logged } = auth;

  const Routes = createRouter(logged);

  return <Routes />;
}
