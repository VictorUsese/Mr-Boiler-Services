document.getElementById('payment-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const payload = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email')
  };

  try {
    const res = await fetch('/api/payments/create-customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.redirectUrl) {
      window.location.href = data.redirectUrl; // Go to GoCardless payment page
    } else {
      alert('Something went wrong');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to initiate payment');
  }
});
