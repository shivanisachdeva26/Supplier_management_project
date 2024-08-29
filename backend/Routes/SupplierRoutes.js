const { createSupplier,
  getAllSuppliers,
  getSupplierById,
  deleteSupplierById,
  updateSupplierById
} = require('../Controllers/SupplierController');
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader');

const router = require('express').Router();
router.get('/', getAllSuppliers)
router.get('/:id', getSupplierById)
router.delete('/:id', deleteSupplierById)
router.put('/:id', cloudinaryFileUploader.single('profileImage'), updateSupplierById)
router.post('/', cloudinaryFileUploader.single('profileImage') ,createSupplier);

module.exports = router;