// ScheduleController.js
const { Schedule } = require('../models/AllModel'); // Import the Schedule model

// Create a new schedule
const createSchedule = async (req, res) => {
  try {
    const { doctorProfileId, userId, dayOfWeek, startTime, endTime } = req.body;

    // Check if the slot is already taken
    const existingSchedule = await Schedule.findOne({
      where: {
        doctorProfileId,
        userId,
        dayOfWeek,
        startTime,
        endTime,
        available: false, // Check only booked slots
      },
    });

    if (existingSchedule) {
      return res.status(400).json({ message: 'Slot is already booked' });
    }

    const newSchedule = await Schedule.create({
      doctorProfileId,
      userId,
      dayOfWeek,
      startTime,
      endTime,
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get schedule by ID
const getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a schedule by ID
const updateScheduleById = async (req, res) => {
    const { id } = req.params;
    const { dayOfWeek, startTime, endTime } = req.body;
  
    try {
      const schedule = await Schedule.findByPk(id);
  
      if (!schedule) {
        return res.status(404).json({ error: 'Schedule not found' });
      }
  
      // // Update schedule attributes
      // schedule.dayOfWeek = dayOfWeek;
      // schedule.startTime = startTime;
      // schedule.endTime = endTime;

      // Update schedule attributes
    await schedule.update({
      dayOfWeek,
      startTime,
      endTime,
    });
  
      // // Save the updated schedule
      // await schedule.save();
  
      return res.status(200).json(schedule);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Delete schedule by ID
const deleteScheduleById = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    await schedule.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createSchedule, getAllSchedules, getScheduleById, updateScheduleById, deleteScheduleById };