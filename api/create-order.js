const PRODUCTS = [6999,6999,7499,6499,5999,5499,5499,4999,5799,5799,6299,6199];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'Cart is empty' });

    const total = items.reduce((sum, item) => {
      const i = Number(item?.i);
      const q = Number(item?.q);
      if (!Number.isInteger(i) || !Number.isInteger(q) || q < 1 || !PRODUCTS[i]) throw new Error('Invalid cart');
      return sum + PRODUCTS[i] * q;
    }, 0);

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return res.status(500).json({ error: 'Razorpay keys are not configured on the server' });

    const auth = Buffer.from(keyId + ':' + keySecret).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: total * 100,
        currency: 'INR',
        receipt: 'lumora_' + Date.now().toString(36),
        notes: { source: 'lumora-neon-store' }
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.description || 'Razorpay order creation failed' });

    return res.status(200).json({ order_id: data.id, amount: data.amount, currency: data.currency, key_id: keyId });
  } catch (e) {
    return res.status(400).json({ error: e.message || 'Unable to create order' });
  }
}
