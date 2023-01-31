import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Name must be at least two characters'],
    maxLength: [36, 'Name must be at most thirty six characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
}, { timestamps: true })

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;