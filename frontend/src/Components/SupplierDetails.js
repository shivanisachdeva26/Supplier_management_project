import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetSupplierDetailsById } from '../api';

const SupplierDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [supplier, setSupplier] = useState({});

    const fetchSupplierDetails = async () => {
        try {
            const data = await GetSupplierDetailsById(id);
            setSupplier(data);
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchSupplierDetails();
    }, [id])

    if (!supplier) {
        return <div>Supplier not found</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Supplier Details</h2>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <img
                                src={supplier.profileImage}
                                alt={supplier.name}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-9">
                            <h4>{supplier.name}</h4>
                    
                            <p><strong>Products:</strong> {supplier.products}</p>
                            <p><strong>Address:</strong> {supplier.address}</p>
                            <p><strong>Phone:</strong> {supplier.phone}</p>
                            <p><strong>Orders:</strong> {supplier.orders}</p>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/supplier')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SupplierDetails;