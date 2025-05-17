require('dotenv').config();
const express = require('express');
const app = express();
const paymentRoutes = require('./routes/payments');

app.use(express.static('mrboilerservices.co.uk')); // <-- serve HTML/JS/CSS
app.use(express.json());
app.use('/api/payments', require('./routes/payments'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
