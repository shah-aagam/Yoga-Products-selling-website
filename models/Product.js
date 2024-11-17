import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imageUrl: { type: String, required: true }, 
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
