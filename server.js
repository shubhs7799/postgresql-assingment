const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/buses', busRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
