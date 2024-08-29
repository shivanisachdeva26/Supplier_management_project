import React, { useEffect, useState } from 'react';
import SupplierTable from './SupplierTable';
import AddSupplier from './AddSupplier';
import { DeleteSupplierById, GetAllSuppliers } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';


const SupplierManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [supplierObj, setSupplierObj] = useState(null)
    const [suppliersData, setSuppliersData] = useState({
      suppliers: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalSuppliers: 0,
            totalPages: 0
        }
    });

    const fetchSuppliers = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchSuppliers')
        try {
            const data =
                await GetAllSuppliers(search, page, limit);
            console.log(data);
            setSuppliersData(data);
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchSuppliers();
    }, [])


    const handleSearch = (e) => {
        fetchSuppliers(e.target.value)
    }

    const handleUpdateSupplier = async (emp) => {
        setSupplierObj(emp);
        setShowModal(true);
    }
    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <h1>Supplier Management App</h1>
            <div className='w-100 d-flex justify-content-center'>
                <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>
                    <div className='d-flex justify-content-between mb-3'>
                        <button className='btn btn-primary'
                            onClick={() => setShowModal(true)}>Add</button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search suppliers..."
                            className='form-control w-50'
                        />
                    </div>
                    <SupplierTable
                        suppliers={suppliersData.suppliers}
                        pagination={suppliersData.pagination}
                        fetchSuppliers={fetchSuppliers}
                        handleUpdateSupplier={handleUpdateSupplier}
                    />

                    <AddSupplier
                        fetchSuppliers={fetchSuppliers}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        supplierObj={supplierObj}
                    />
                </div>
            </div>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default SupplierManagementApp;