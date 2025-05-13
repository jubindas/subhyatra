import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  supplyType: { type: String, enum: ['hotel', 'bus', 'car'], required: true },
});

// Hash password before saving
supplierSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
supplierSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Supplier', supplierSchema);
