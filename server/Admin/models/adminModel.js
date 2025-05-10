const mongoose = require('mongoose');

    const AdminSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        trim: true,
      },
      collegeName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

    const Admin = mongoose.model('Admin', AdminSchema);
    module.exports = Admin;