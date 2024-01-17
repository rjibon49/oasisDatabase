const { Appointment, Schedule } = require('../models/AllModel');

const createAppointment = async (req, res) => {
  try {
    const { doctorProfileId, patientProfileId, scheduleId } = req.body;

    const schedule = await Schedule.findByPk(scheduleId);

    if (!schedule || !schedule.available) {
      return res.status(400).json({ message: 'Selected schedule is not available' });
    }

    const newAppointment = await Appointment.create({
      doctorProfileId,
      patientProfileId,
      scheduleId,
      status: 'Pending',
    });

    await schedule.update({ available: false });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create appointment' });
  }
};

const updateAppointmentstatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { role } = req.user;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (
      (role === 'Doctor' && (status === 'Complete' || status === 'Cancel')) ||
      (role === 'Patient' && status === 'Cancel')
    ) {
      await appointment.update({ status });
      res.status(200).json(appointment);
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update appointment status' });
  }
};

const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { newscheduleId } = req.body;
    const { role } = req.user;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (role === 'Patient') {
      // Logic to check if the new time slot is available
      // Update the scheduleId of the appointment
      await appointment.update({ scheduleId: newscheduleId });
      res.status(200).json(appointment);
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to reschedule appointment' });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.user;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (role === 'Patient') {
      await appointment.update({ status: 'Cancel' });
      res.status(200).json(appointment);
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to cancel appointment' });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

module.exports = {
  createAppointment,
  updateAppointmentstatus,
  rescheduleAppointment,
  cancelAppointment,
  getAllAppointments,
};





// // Update the status of an appointment
// const updateAppointmentstatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const appointment = await Appointment.findByPk(id);

//     if (!appointment) {
//       return res.status(404).json({ message: 'Appointment not found' });
//     }

//     await appointment.update({ status });

//     res.status(200).json(appointment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Get all appointments
// const getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.findAll();

//     res.status(200).json(appointments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
