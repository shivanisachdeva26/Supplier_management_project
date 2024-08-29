import React, { useEffect, useState } from 'react'
import { notify } from '../utils';
import { CreateSupplier, UpdateSupplierById } from '../api';

function AddSupplier({
    showModal, setShowModal, fetchSuppliers, supplierObj
}) {
    const [supplier, setSupplier] = useState({
        profileImage: null,
        name: '',
        products: '',
        address: '',
        phone: '',
        orders: ''
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (supplierObj) {
            setSupplier(supplierObj);
            setUpdateMode(true);
        }
    }, [supplierObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleFileChange = (e) => {
        setSupplier({ ...supplier, profileImage: e.target.files[0] });
    };

    const resetSupplierStates = () => {
        setSupplier({
          profileImage: null,
          name: '',
          products: '',
          address: '',
          phone: '',
          orders: ''
        })
    }

    const handleAddSupplier = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode ?
                await UpdateSupplierById(supplier, supplier._id)
                : await CreateSupplier(supplier);
            console.log('create OR update ', success, message);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            setShowModal(false);
            resetSupplierStates();
            fetchSuppliers();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Supplier', 'error')
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetSupplierStates();
    }
    return (
        < div className={`modal ${showModal ? 'd-block' : ''}`
        } tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"> {
                            updateMode ? 'Update Supplier' : 'Add Supplier'
                        }</h5>
                        <button type="button" className="btn-close"
                            onClick={() => handleModalClose()}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddSupplier}>
                        <div className="mb-3">
                                <label className="form-label">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={supplier.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Products</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="products"
                                    value={supplier.products}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={supplier.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={supplier.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Orders</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="orders"
                                    value={supplier.orders}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            <button type="submit"
                                className="btn btn-primary">
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default AddSupplier;