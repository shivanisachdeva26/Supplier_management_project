import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SupplierManagementApp from './Components/SupplierManagementApp';
import SupplierDetails from './Components/SupplierDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="supplier" />} />
          <Route path="/supplier" element={<SupplierManagementApp />} />
          <Route path="/supplier/:id" element={<SupplierDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;