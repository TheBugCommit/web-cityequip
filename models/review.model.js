import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  equipmentUuid: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  }
}, {
  strict: true,
  collection: 'Reviews',
  timestamps: true
})

// Evitar que un mismo usuario puntúe el mismo producto más de una vez
reviewSchema.index({ equipmentUuid: 1, user: 1 }, { unique: true })

const Review = mongoose.model('Review', reviewSchema)
export default Review