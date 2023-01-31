import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema({
  reviewBy: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  style: {
    color: String,
    image: String
  },
  fit: {
    type: String
  },
  images: [],
  like: []
})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the product name']
  },
  description: { 
    type: String,
    required: [true, 'Please enter a description for this product'],
    trim: true,
    unique: true  
  },
  brand: {
    type: String
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  category: {
    type: ObjectId,
    required: true,
    ref: 'Category'
  },
  subCategories: [
    {
      type: ObjectId
    }
  ],
  details: [
    {
      name: String,
      value: String
    }
  ],
  questions: [
    {
      question: String,
      answer: String
    }
  ],
  reviews: [reviewSchema],
  refundPolicy: {
    type: String,
    default: '30 days'
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  shipping: {
    type: Number,
    required: true,
    default: 0
  },
  subProducts: [
    {
      images: [],
      description_images: [],
      color:{
        color: {
          type: String
        },
        image: {
          type: String
        }
      },
      sizes: [
        {
          size: String,
          quantity: Number,
          price: Number
        },
      ],
      discount: {
        type: Number,
        default: 0
      },
      sold: {
        type: Number,
        default: 0
      }
    }
  ]
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
