import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema

const subcategorySchema = new mongoose.Schema({
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
  parent: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  }
}, { timestamps: true })

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subcategorySchema);

export default SubCategory;