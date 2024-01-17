const { Payment, Appointment } = require('../models/AllModel');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { appointmentId, amount, currency, paymentIntentId } = req.body;

    // Check if the appointment exists
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Create the payment
    const newPayment = await Payment.create({
      appointmentId,
      amount,
      currency,
      paymentIntentId,
      status: 'Pending',
    });

    res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create payment' });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Appointment, attributes: ['appointmentId', 'status'] }],
    });

    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id, {
      include: [{ model: Appointment, attributes: ['appointmentId', 'status'] }],
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch payment' });
  }
};

// Update a payment by ID
const updatePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.update({ status });

    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update payment' });
  }
};

// Delete payment by ID
const deletePaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.destroy();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete payment' });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};