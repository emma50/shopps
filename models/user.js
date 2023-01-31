import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your full name']
  },
  email: { 
    type: String,
    required: [true, 'Please enter your email address'],
    trim: true,
    unique: true  
  },
  password: {
    type: String,
    required: [true, 'Please enter your password']
  },
  role: {
    type: String,
    default: 'User'
  },
  image: {
    type: String,
    default: 'https://avatars.githubusercontent.com/u/41920612?v=4'
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  defaultPaymentMethod: {
    type: String,
    default: ''
  },
  address: [
    {
      firstName: String,
      lastName: String,
      phoneNumber: String,
      address1: String,
      address2: String,
      city: String,
      zipCode: String,
      state: String,
      country: String,
      active: {
        type: Boolean,
        default: false
      },
    }
  ]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
