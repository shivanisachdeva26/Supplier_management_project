const SupplierModel = require("../Models/SupplierModel");


const createSupplier = async (req, res) => {
    try {
        const body = req.body;
        const profileImage = req?.file ? req?.file?.path : null;
        body.profileImage = profileImage;
        const emp = new SupplierModel(body);

        await emp.save();
        res.status(201)
            .json({
                message: 'Supplier Created',
                success: true
            });
    } catch (err) {
        console.log('Error ', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}
const getAllSuppliers = async (req, res) => {
    try {
        // Get page and limit from query parameters
        let { page, limit, search } = req.query;

        // Set default values if they are not provided
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Build the search criteria
        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i' // case insensitive
                }
            }
        }
        // Get the total number of Suppliers for pagination info
        const totalSuppliers = await SupplierModel.countDocuments(searchCriteria);

        // Fetch the Suppliers with pagination
        const emps = await SupplierModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        // Calculate total pages
        const totalPages = Math.ceil(totalSuppliers / limit);

        res.status(200)
            .json({
                message: 'All Suppliers',
                success: true,
                data:  {
                    suppliers: emps,
                    pagination: {
                        totalSuppliers,
                        currentPage: page,
                        totalPages,
                        pageSize: limit
                    }
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};

const getSupplierById = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await SupplierModel.findOne({ _id: id });
        res.status(200)
            .json({
                message: 'Supplier Details',
                success: true,
                data: emp
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const deleteSupplierById = async (req, res) => {
    try {
        const id = req.params.id;
        await SupplierModel.deleteOne({ _id: id });
        res.status(200)
            .json({
                message: 'Supplier Deleted Successfully',
                success: true
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const updateSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, products,address, phone, orders } = req.body;
        let updateData = {
            name, products, address, phone, orders, updatedAt: new Date()
        };
        console.log('<-- update ---> ', req.file)
        if (req.file) {
            updateData.profileImage = req.file.path;
        }
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        res.status(200)
            .json({
                message: 'Supplier Updated Successfully',
                success: true,
                data: updatedSupplier
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    deleteSupplierById,
    updateSupplierById
}