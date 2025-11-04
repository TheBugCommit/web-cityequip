import mongoose from 'mongoose'
import { v4 as uuidv4 } from "uuid"

const reviewSchema = new mongoose.Schema({
  uuid: { 
    type: String, 
    default: () => uuidv4(), 
    unique: true 
  },
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

reviewSchema.index({ equipmentUuid: 1, user: 1 }, { unique: true })

function autoPopulateUser(next) {
  this.populate('user')
  next()
}

reviewSchema.pre('find', autoPopulateUser)
reviewSchema.pre('findOne', autoPopulateUser)

const Review = mongoose.model('Review', reviewSchema)
export default Review