// models/User.ts
import mongoose, { Schema, Document, Model } from 'mongoose'
import type { UserRole } from '@/types'

export interface IUser extends Document {
  name: string
  email: string
  // password is optional because OAuth users (Google etc.) won't have one
  password?: string
  role: UserRole
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // Not required — OAuth users won't have a password
      select: false, // never returned in queries by default
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    emailVerified: Date,
  },
  { timestamps: true }
)

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User