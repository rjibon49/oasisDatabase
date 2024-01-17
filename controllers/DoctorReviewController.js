const { DoctorReview, DoctorProfile, PatientProfile } = require('../models/AllModel');

// Create a new doctor review
const createDoctorReview = async (req, res) => {
  try {
    const { doctorProfileId, patientProfileId, rating, comments } = req.body;

    const newDoctorReview = await DoctorReview.create({
      doctorProfileId,
      patientProfileId,
      rating,
      comments,
    });

    res.status(201).json(newDoctorReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create doctor review' });
  }
};

// Get all doctor reviews
const getAllDoctorReviews = async (req, res) => {
  try {
    const doctorReviews = await DoctorReview.findAll({
      include: [
        { model: DoctorProfile, attributes: ['doctorProfileId', 'name'] },
        { model: PatientProfile, attributes: ['patientProfileId', 'name'] },
      ],
    });

    res.status(200).json(doctorReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch doctor reviews' });
  }
};

// Get doctor review by ID
const getDoctorReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorReview = await DoctorReview.findByPk(id, {
      include: [
        { model: DoctorProfile, attributes: ['doctorProfileId', 'name'] },
        { model: PatientProfile, attributes: ['patientProfileId', 'name'] },
      ],
    });

    if (!doctorReview) {
      return res.status(404).json({ message: 'Doctor review not found' });
    }

    res.status(200).json(doctorReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch doctor review' });
  }
};

// Update a doctor review by ID
const updateDoctorReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comments } = req.body;

    const doctorReview = await DoctorReview.findByPk(id);

    if (!doctorReview) {
      return res.status(404).json({ message: 'Doctor review not found' });
    }

    await doctorReview.update({ rating, comments });

    res.status(200).json(doctorReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update doctor review' });
  }
};

// Delete doctor review by ID
const deleteDoctorReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorReview = await DoctorReview.findByPk(id);

    if (!doctorReview) {
      return res.status(404).json({ message: 'Doctor review not found' });
    }

    await doctorReview.destroy();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete doctor review' });
  }
};

module.exports = {
  createDoctorReview,
  getAllDoctorReviews,
  getDoctorReviewById,
  updateDoctorReviewById,
  deleteDoctorReviewById,
};