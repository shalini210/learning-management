const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  verify: { type: Boolean, required: true },
  role: { type: String, required: true },
  otp: { type: String, required: true },
  refreshTokens: [{ tokenHash: String, createdAt: Date }]
});

module.exports = mongoose.model('User', userSchema);
