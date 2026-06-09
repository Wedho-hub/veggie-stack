// models/Order.ts
import mongoose, { Schema, Document, Model } from 'mongoose'

// TypeScript: all possible order states as a union type
export type OrderStatus =
  | 'pending'
  | 'payment_initiated'
  | 'paid'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentMethod = 'payfast' | 'paypal'

export interface IOrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  category: string
}

export interface IDeliveryAddress {
  fullName: string
  phone: string
  street: string
  suburb: string
  city: string
  province: string
  postalCode: string
}

export interface IOrder extends Document {
  orderNumber: string
  customerEmail: string
  items: IOrderItem[]
  deliveryAddress: IDeliveryAddress
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentId?: string        // PayFast pf_payment_id or PayPal order ID
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        category: String,
      },
    ],
    deliveryAddress: {
      fullName: String,
      phone: String,
      street: String,
      suburb: String,
      city: String,
      province: String,
      postalCode: String,
    },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'payment_initiated', 'paid', 'processing',
             'out_for_delivery', 'delivered', 'cancelled', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['payfast', 'paypal'],
      required: true,
    },
    paymentId: String,
    paidAt: Date,
  },
  { timestamps: true }
)

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export default Order