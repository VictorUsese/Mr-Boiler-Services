const client = require('../config/gocardlessClient');

exports.createCustomerFlow = async (req, res) => {
  try {
    const flow = await client.redirectFlows.create({
      description: 'Mr Boiler Premium Plan',
      session_token: 'some-unique-token-abc123',
      success_redirect_url: 'https://yourdomain.com/thank-you',
      prefilled_customer: {
        given_name: req.body.firstName,
        family_name: req.body.lastName,
        email: req.body.email,
      }
    });

    res.json({ redirectUrl: flow.redirect_url });
  } catch (error) {
    console.error(error.response?.body || error);
    res.status(500).json({ error: 'Error creating redirect flow' });
  }
};

exports.confirmPaymentFlow = async (req, res) => {
  const { redirect_flow_id } = req.query;

  try {
    const completedFlow = await client.redirectFlows.complete(redirect_flow_id, {
      session_token: 'some-unique-token-abc123'
    });

    const mandateId = completedFlow.links.mandate;
    const customerId = completedFlow.links.customer;

    // Save mandateId and customerId in your DB
    res.redirect('/thank-you');
  } catch (error) {
    console.error(error.response?.body || error);
    res.status(500).json({ error: 'Error confirming payment' });
  }
};
