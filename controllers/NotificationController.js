const { Notification, User } = require('../models/AllModel');

// Create a new notification
const createNotification = async (req, res) => {
  try {
    const { userId, message, Type } = req.body;

    // Check if the user exists
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the notification
    const newNotification = await Notification.create({
      userId,
      message,
      Type,
      isRead: false, // Set the initial status to unread
    });

    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create notification' });
  }
};

// Get all notifications for a user
const getNotificationsByuserId = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the user ID is passed as a route parameter

    // Check if the user exists
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all notifications for the user
    const notifications = await Notification.findAll({
      where: { userId: id },
      order: [['createdAt', 'DESC']], // Order by creation date in descending order
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the notification exists
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Mark the notification as read
    await notification.update({ isRead: true });

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to mark notification as read' });
  }
};

// Delete a notification by ID
const deleteNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the notification exists
    const notification = await Notification.findByPk(id);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Delete the notification
    await notification.destroy();

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete notification' });
  }
};

module.exports = {
  createNotification,
  getNotificationsByuserId,
  markNotificationAsRead,
  deleteNotificationById,
};
