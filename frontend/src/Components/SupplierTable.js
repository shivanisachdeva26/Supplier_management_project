// import React from 'react'
// import { Link } from 'react-router-dom'
// import { DeleteSupplierById } from '../api';
// import { notify } from '../utils';


// function SupplierTable({
//     suppliers=[], pagination={},
//     fetchSuppliers, handleUpdateSupplier }) {
//     const headers = ['Name', 'Products', 'Phone', 'Address', 'Orders'];
//     const { currentPage, totalPages} = pagination ;
//     // const { currentPage = 1, totalPages = 1 } = pagination || {};


//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             handlePagination(currentPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             handlePagination(currentPage - 1);
//         }
//     };
//     const handlePagination = (currentPage) => {
//         fetchSuppliers('', currentPage, 5)
//     }

//     const handleDeleteSupplier = async (id) => {
//         try {
//             const { success, message } = await DeleteSupplierById(id);
//             if (success) {
//                 notify(message, 'success')
//             } else {
//                 notify(message, 'error')
//             }
//             fetchSuppliers();
//         } catch (err) {
//             console.error(err);
//             notify('Failed to delete Supplier', 'error')
//         }
//     }


//     const TableRow = ({ supplier }) => {
//         return <tr>
//             <td>
//                 <Link to={`/supplier/${supplier._id}`} className="text-decoration-none">
//                     {supplier.name}
//                 </Link>
//             </td>
//             <td>{supplier.products}</td>
//             <td>{supplier.address}</td>
//             <td>{supplier.phone}</td>
//             <td>{supplier.orders}</td>
//             <td>
//                 <i
//                     className='bi bi-pencil-fill text-warning me-4'
//                     role="button"
//                     data-bs-toggle="tooltip"
//                     data-bs-placement="top"
//                     title="Edit"
//                     onClick={() => handleUpdateSupplier(supplier)}
//                 ></i>
//                 <i
//                     className='bi bi-trash-fill text-danger'
//                     role="button"
//                     data-bs-toggle="tooltip"
//                     data-bs-placement="top"
//                     title="Delete"
//                     onClick={() => handleDeleteSupplier(supplier._id)}
//                 ></i>
//             </td>
//         </tr>
//     }
//     const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

//     return (
//         <>
//             <table className='table table-striped'>
//                 <thead>
//                     <tr>
//                         {
//                             headers.map((header, i) => (
//                                 <th key={i}>{header}</th>
//                             ))
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         suppliers.length === 0 ? <tr><td colSpan={headers.length}> Data Not Found</td></tr>
//                             : suppliers.map((emp) => (
//                                 <TableRow supplier={emp} key={emp._id} />
//                             ))
//                     }
//                 </tbody>
//             </table>

//             <div className="d-flex justify-content-between align-items-center my-3">
//                 <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
//                 <div>
//                     <button
//                         className="btn btn-outline-primary me-2"
//                         onClick={handlePreviousPage}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     {pageNumbers.map(page => (
//                         <button
//                             key={page}
//                             className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
//                             onClick={() => handlePagination(page)}
//                         >
//                             {page}
//                         </button>
//                     ))}
//                     <button
//                         className="btn btn-outline-primary ms-2"
//                         onClick={handleNextPage}
//                         disabled={totalPages === currentPage }
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>

//         </>
//     )
// }

// export default SupplierTable;



import React from 'react'
import { Link } from 'react-router-dom'
import { DeleteSupplierById } from '../api';
import { notify } from '../utils';


function SupplierTable({
    suppliers=[], pagination={},
    fetchSuppliers, handleUpdateSupplier }) {
    const headers = ['Name', 'Products', 'Address', 'Phone', 'Orders'];
    const { currentPage, totalPages } = pagination;

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePagination(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePagination(currentPage - 1);
        }
    };
    const handlePagination = (currentPage) => {
        fetchSuppliers('', currentPage, 5)
    }

    const handleDeleteSupplier = async (id) => {
        try {
            const { success, message } = await DeleteSupplierById(id);
            if (success) {
                notify(message, 'success')
            } else {
                notify(message, 'error')
            }
            fetchSuppliers();
        } catch (err) {
            console.error(err);
            notify('Failed to delete Supplier', 'error')
        }
    }


    const TableRow = ({ supplier }) => {
        return <tr>
            <td>
                <Link to={`/supplier/${supplier._id}`} className="text-decoration-none">
                    {supplier.name}
                </Link>
            </td>
            <td>{supplier.products}</td>
            <td>{supplier.address}</td>
            <td>{supplier.phone}</td>
            <td>{supplier.orders}</td>
            <td>
                <i
                    className='bi bi-pencil-fill text-warning me-4'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Edit"
                    onClick={() => handleUpdateSupplier(supplier)}
                ></i>
                <i
                    className='bi bi-trash-fill text-danger'
                    role="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete"
                    onClick={() => handleDeleteSupplier(supplier._id)}
                ></i>
            </td>
        </tr>
    }
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {
                            headers.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        suppliers.length === 0 ? <div> Data Not Found</div>
                            : suppliers.map((emp) => (
                                <TableRow supplier={emp} key={emp._id} />
                            ))
                    }
                </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center my-3">
                <span className="badge bg-primary">Page {currentPage} of {totalPages}</span>
                <div>
                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`btn btn-outline-primary me-1 ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePagination(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="btn btn-outline-primary ms-2"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

        </>
    )
}

export default SupplierTable;