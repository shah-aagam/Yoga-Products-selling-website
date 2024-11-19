import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title : { type: String , required: true},
    imageurl : { type: String , required: true},
    description : { type: String , required:  true},
    date: { type: Date , default: Date.now }
})

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);