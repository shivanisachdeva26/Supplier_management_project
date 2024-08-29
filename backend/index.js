const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const SupplierRoutes = require('./Routes/SupplierRoutes');
const PORT = process.env.PORT || 8080;

require('./Models/db');
app.use(cors());
app.use(bodyParser.json());

app.use('/api/suppliers', SupplierRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})