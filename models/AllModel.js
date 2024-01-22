// models.js
const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const {DataTypes} = Sequelize;

// UserModel
const User = db.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'patient',
        validate: {
            isIn: [['admin', 'doctor', 'patient']],
        },
    },
    status: {
        type: DataTypes.ENUM('active', 'disabled'),
        allowNull: false,
        defaultValue: 'active', // Set a default status
    },
});

// PatientModel
const PatientProfile = db.define('PatientProfile', {
    patientProfileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
});

// DoctorModel
const DoctorProfile = db.define('DoctorProfile', {
    doctorProfileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    education: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

// AdminModel
const AdminProfile = db.define('AdminProfile', {
    adminProfileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});


// ScheduleModel.js

const Schedule = db.define('Schedule', {
    scheduleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    doctorProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dayOfWeek: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']],
        },
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Initially, all slots are available
      },
});

// AppointmentModel.js

const Appointment = db.define('Appointment', {
    appointmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    doctorProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patientProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'complete', 'canceled'),
        allowNull: false,
        defaultValue: 'pending',
    },
});

// Doctor Profile Review Model

const DoctorReview = db.define('DoctorReview', {
    doctorReviewId : {
        type : DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    doctorProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    patientProfileId : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Payment Model
const Payment = db.define('Payment', {
    paymentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    appointmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER, // Store in cents to avoid floating-point precision issues
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
    },
});

// Notification Model
const Notification = db.define('Notification', {
    notificationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Add any necessary associations
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    // Additional fields related to notifications
    type: {
        type: DataTypes.STRING, // Notification type (e.g., 'message', 'Alert', 'Reminder')
        allowNull: true,
    },
    link: {
        type: DataTypes.STRING, // Link to navigate when the notification is clicked
        allowNull: true,
    },
    metaData: {
        type: DataTypes.JSON, // Additional metadata associated with the notification
        allowNull: true,
    }
});


// Associations

// Each User has one of the following profiles
User.hasOne(DoctorProfile, { foreignKey: 'userId' });
User.hasOne(PatientProfile, { foreignKey: 'userId' });
User.hasOne(AdminProfile, { foreignKey: 'userId' });

// Each DoctorProfile belongs to one User
DoctorProfile.belongsTo(User, { foreignKey: 'userId' });

// Each PatientProfile belongs to one User
PatientProfile.belongsTo(User, { foreignKey: 'userId' });

// Each AdminProfile belongs to one User
AdminProfile.belongsTo(User, { foreignKey: 'userId' });

// Each Schedule belongs to one User (Doctor)
Schedule.belongsTo(User, { foreignKey: 'userId' });

// Each Schedule belongs to one DoctorProfile
Schedule.belongsTo(DoctorProfile, { foreignKey: 'doctorProfileId' });

// Each Appointment belongs to one DoctorProfile
Appointment.belongsTo(DoctorProfile, { foreignKey: 'doctorProfileId' });

// Each Appointment belongs to one PatientProfile (aliased as 'Patient')
Appointment.belongsTo(PatientProfile, { foreignKey: 'patientProfileId', as: 'Patient' });

// Each Appointment belongs to one Schedule
Appointment.belongsTo(Schedule, { foreignKey: 'scheduleId' });

// Each DoctorProfile has many Schedules
DoctorProfile.hasMany(Schedule, { foreignKey: 'doctorProfileId' });

// Each DoctorProfile has many DoctorReviews
DoctorProfile.hasMany(DoctorReview, { foreignKey: 'doctorProfileId' });

// Each PatientProfile has many Appointments
PatientProfile.hasMany(Appointment, { foreignKey: 'patientProfileId' });

// Each DoctorProfile has many DoctorReviews
DoctorProfile.hasMany(DoctorReview, { foreignKey: 'doctorProfileId' });

// Each PatientProfile has many Appointments
PatientProfile.hasMany(Appointment, { foreignKey: 'patientProfileId' });

// Each DoctorReview belongs to one DoctorProfile
DoctorReview.belongsTo(DoctorProfile, { foreignKey: 'doctorProfileId' });

// Each DoctorReview belongs to one PatientProfile
DoctorReview.belongsTo(PatientProfile, { foreignKey: 'patientProfileId' });

// Associate Payment model with Appointment
Payment.belongsTo(Appointment, { foreignKey: 'appointmentId' });

// Associate Notification model with User
Notification.belongsTo(User, { foreignKey: 'userId' });



module.exports = { User, DoctorProfile, PatientProfile, AdminProfile, Schedule, Appointment, DoctorReview, Notification };









// // Associations
// DoctorProfile.belongsTo(User, { foreignKey: 'userId' });
// PatientProfile.belongsTo(User, { foreignKey: 'userId' });
// AdminProfile.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(Schedule, { foreignKey: 'userId' });
// DoctorProfile.hasMany(Schedule, { foreignKey: 'doctorProfileId' });

// // Relationships
// Appointment.belongsTo(DoctorProfile, { foreignKey: 'doctorProfileId' });
// Appointment.belongsTo(PatientProfile, { foreignKey: 'patientProfileId', as: 'Patient' });
// Appointment.belongsTo(Schedule, { foreignKey: 'scheduleId' });