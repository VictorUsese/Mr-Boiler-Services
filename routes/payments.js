const express = require('express');
const router = express.Router();
const {
  createCustomerFlow,
  confirmPaymentFlow
} = require('../controllers/paymentController');

router.post('/create-customer', createCustomerFlow);
router.get('/confirm-payment', confirmPaymentFlow);

module.exports = router;
