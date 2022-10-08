import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Customer from '../Pages/Customer/Customer';
import './App.css';
import { ExternalDataProvider } from '../Provider/ExternalDataProvider';
import CustomerEditor from '../Pages/CustomerEditor/CustomerEditor';

function App() {
  return (
    <BrowserRouter>
      <ExternalDataProvider>
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/CustomerEditor" element={<CustomerEditor />} />
          <Route path="/CustomerEditor/:userId" element={<CustomerEditor />} />
        </Routes>
      </ExternalDataProvider>
    </BrowserRouter>
  );
}

export default App;
