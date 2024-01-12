import Head from 'next/head';
// import '../styles/AddEmployee.module.css';

import HomePage from './HomePage';
import AuthProvider from './context/AuthProvider';

export default function Home() {

  return (
    <div>
      <HomePage />
    </div>
  );
}
