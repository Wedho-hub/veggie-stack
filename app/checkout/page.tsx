'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cartContext'
import { ArrowLeft, Truck, CreditCard } from 'lucide-react'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import PayPalCheckout from '@/components/PayPalCheckout'
import { useSession } from 'next-auth/react'

interface DeliveryForm {
  fullName: string
  email: string
  phone: string
  street: string
  suburb: string
  city: string
  province: string
  postalCode: string
}

const PROVINCES = [
  'Western Cape', 'Eastern Cape', 'Northern Cape',
  'Gauteng', 'KwaZulu-Natal', 'Free State',
  'Limpopo', 'Mpumalanga', 'North West',
]

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency', currency: 'ZAR',
  }).format(price)
}

// Defined outside CheckoutPage so React doesn't recreate it on every render
interface FieldProps {
  label: string
  name: keyof DeliveryForm
  type?: string
  placeholder?: string
  half?: boolean
  form: DeliveryForm
  errors: Partial<DeliveryForm>
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function Field({ label, name, type = 'text', placeholder, half = false, form, errors, onChange }: FieldProps) {
  return (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        placeholder={placeholder}
        className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
          errors[name] ? 'border-red-400' : 'border-gray-200'
        }`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  )
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const { data: session } = useSession()

const [form, setForm] = useState<DeliveryForm>({
  fullName: '',
  email: '',
  phone: '',
  street: '', suburb: '', city: 'Cape Town',
  province: 'Western Cape', postalCode: '',
})

// Session loads asynchronously — derive effective values so the form
// shows the user's name/email as soon as the session is ready,
// but typed values always take precedence.
const effectiveForm: DeliveryForm = {
  ...form,
  fullName: form.fullName || session?.user?.name || '',
  email: form.email || session?.user?.email || '',
}

  const [paymentMethod, setPaymentMethod] = useState<'payfast' | 'paypal' | null>(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<DeliveryForm>>({})
  const [orderReady, setOrderReady] = useState(false)
  const [createdOrderNumber, setCreatedOrderNumber] = useState('')

  const deliveryFee = state.totalPrice >= 500 ? 0 : 65
  const orderTotal = state.totalPrice + deliveryFee

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🛒</p>
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/shop" className="text-green-600 hover:underline">
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  function validate(): boolean {
    const newErrors: Partial<DeliveryForm> = {}
    if (!effectiveForm.fullName) newErrors.fullName = 'Required'
    if (!effectiveForm.email || !effectiveForm.email.includes('@')) newErrors.email = 'Valid email required'
    if (!effectiveForm.phone) newErrors.phone = 'Required'
    if (!effectiveForm.street) newErrors.street = 'Required'
    if (!effectiveForm.suburb) newErrors.suburb = 'Required'
    if (!effectiveForm.postalCode) newErrors.postalCode = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.name as keyof DeliveryForm
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handlePayFast() {
    if (!validate()) return
    setLoading(true)

    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: effectiveForm.email,
          items: state.items.map(({ product, quantity }) => ({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity,
            category: product.category,
          })),
          deliveryAddress: {
            fullName: effectiveForm.fullName,
            phone: effectiveForm.phone,
            street: effectiveForm.street,
            suburb: effectiveForm.suburb,
            city: effectiveForm.city,
            province: effectiveForm.province,
            postalCode: effectiveForm.postalCode,
          },
          subtotal: state.totalPrice,
          deliveryFee,
          total: orderTotal,
          paymentMethod: 'payfast',
        }),
      })

      const orderData = await orderRes.json()
      const orderNumber = orderData.data.orderNumber

      const pfRes = await fetch('/api/payfast/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          amount: orderTotal.toFixed(2),
          email: effectiveForm.email,
          name: effectiveForm.fullName,
          itemName: `Veggie Stack Order ${orderNumber}`,
        }),
      })

      const pfData = await pfRes.json()
      clearCart()
      window.location.href = pfData.url

    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  async function handlePreparePayPal() {
    if (!validate()) return
    setLoading(true)

    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: effectiveForm.email,
          items: state.items.map(({ product, quantity }) => ({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity,
            category: product.category,
          })),
          deliveryAddress: {
            fullName: effectiveForm.fullName,
            phone: effectiveForm.phone,
            street: effectiveForm.street,
            suburb: effectiveForm.suburb,
            city: effectiveForm.city,
            province: effectiveForm.province,
            postalCode: effectiveForm.postalCode,
          },
          subtotal: state.totalPrice,
          deliveryFee,
          total: orderTotal,
          paymentMethod: 'paypal',
        }),
      })

      const orderData = await orderRes.json()
      setCreatedOrderNumber(orderData.data.orderNumber)
      setOrderReady(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fieldProps = { form: effectiveForm, errors, onChange: handleChange }

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        title="Checkout"
        description="Almost there — fill in your delivery details and choose how to pay"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to cart
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT: FORM ── */}
          <div className="flex-1 space-y-8">

            {/* Delivery details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                <Truck size={20} className="text-green-600" />
                Delivery Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name" name="fullName" placeholder="Jane Smith" {...fieldProps} />
                <Field label="Email" name="email" type="email" placeholder="jane@email.com" half {...fieldProps} />
                <Field label="Phone" name="phone" type="tel" placeholder="+27 82 000 0000" half {...fieldProps} />
                <Field label="Street Address" name="street" placeholder="12 Bree Street" {...fieldProps} />
                <Field label="Suburb" name="suburb" placeholder="Gardens" half {...fieldProps} />
                <Field label="Postal Code" name="postalCode" placeholder="8001" half {...fieldProps} />
                <Field label="City" name="city" half {...fieldProps} />

                {/* Province dropdown */}
                <div className="col-span-1">
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                    Province
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={effectiveForm.province}
                    onChange={handleChange}
                    className="w-full border border-gray-200 bg-white text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none"
                  >
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment method selector */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 text-lg mb-5 flex items-center gap-2">
                <CreditCard size={20} className="text-green-600" />
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                <button
                  type="button"
                  onClick={() => setPaymentMethod('payfast')}
                  className={`border-2 rounded-2xl p-5 text-left transition-all ${
                    paymentMethod === 'payfast'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">🇿🇦</div>
                  <p className="font-bold text-gray-900">PayFast</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pay in ZAR · EFT, credit card, instant EFT, SnapScan
                  </p>
                  <p className="text-xs text-green-600 font-medium mt-2">
                    Recommended for SA customers
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`border-2 rounded-2xl p-5 text-left transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">🌍</div>
                  <p className="font-bold text-gray-900">PayPal</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pay in USD · International cards, PayPal balance
                  </p>
                  <p className="text-xs text-blue-600 font-medium mt-2">
                    For international customers
                  </p>
                </button>

              </div>

              {paymentMethod === 'payfast' && (
                <button
                  type="button"
                  onClick={handlePayFast}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating order...' : `Pay ${formatPrice(orderTotal)} with PayFast`}
                </button>
              )}

              {paymentMethod === 'paypal' && !orderReady && (
                <button
                  type="button"
                  onClick={handlePreparePayPal}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-full transition-colors"
                >
                  {loading ? 'Preparing order...' : 'Continue to PayPal'}
                </button>
              )}

              {paymentMethod === 'paypal' && orderReady && (
                <PayPalCheckout
                  orderNumber={createdOrderNumber}
                  amount={orderTotal}
                  onSuccess={() => {
                    clearCart()
                    router.push(`/order-confirmed?order=${createdOrderNumber}`)
                  }}
                />
              )}

            </div>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Your Order</h2>

              <div className="space-y-3 mb-4">
                {state.items.map(({ product, quantity }) => (
                  <div key={product._id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate flex-1 mr-2">
                      {product.name} × {quantity}
                    </span>
                    <span className="font-medium text-gray-900 shrink-0">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(state.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
