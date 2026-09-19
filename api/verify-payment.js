import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body || {};
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment verification fields' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    const keyId = process.env.RAZORPAY_KEY_ID;
    if (!secret || !keyId) return res.status(500).json({ error: 'Razorpay keys are not configured on the server' });

    const expected = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    const a = Buffer.from(expected);
    const b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(400).json({ verified: false, error: 'Invalid payment signature' });
    }

    const auth = Buffer.from(keyId + ':' + secret).toString('base64');
    const paymentRes = await fetch('https://api.razorpay.com/v1/payments/' + encodeURIComponent(razorpay_payment_id), {
      headers: { Authorization: 'Basic ' + auth }
    });
    const payment = await paymentRes.json();

    if (!paymentRes.ok) return res.status(400).json({ verified: false, error: 'Unable to verify payment with Razorpay' });

    const expectedAmount = Number(amount) * 100;
    if (Number(payment.amount) !== expectedAmount || payment.currency !== 'INR') {
      return res.status(400).json({ verified: false, error: 'Payment amount mismatch' });
    }

    const captured = payment.status === 'captured' || payment.status === 'authorized';
    return res.status(200).json({ verified: captured, status: payment.status, payment_id: payment.id });
  } catch (e) {
    return res.status(400).json({ verified: false, error: e.message || 'Payment verification failed' });
  }
}
