// components/PayPalCheckout.tsx
'use client'

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

interface PayPalCheckoutProps {
  orderNumber: string
  amount: number
  onSuccess: () => void
}

export default function PayPalCheckout({
  orderNumber,
  amount,
  onSuccess,
}: PayPalCheckoutProps) {
  // Convert ZAR to USD approximately — in production use a live exchange rate API
  const amountUSD = (amount / 18.5).toFixed(2)

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
      }}
    >
      <div className="mt-2">
        <p className="text-xs text-gray-400 mb-3 text-center">
          Approx. ${amountUSD} USD · Exchange rate applied at checkout
        </p>
        <PayPalButtons
          style={{ layout: 'vertical', shape: 'pill', label: 'pay' }}
          createOrder={(_data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  reference_id: orderNumber,
                  amount: {
                    currency_code: 'USD',
                    value: amountUSD,
                  },
                  description: `Veggie Stack Order ${orderNumber}`,
                },
              ],
            })
          }}
          onApprove={async (_data, actions) => {
            if (!actions.order) return
            const details = await actions.order.capture()

            // Update order status in our DB
            await fetch('/api/paypal/confirm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderNumber,
                paypalOrderId: details.id,
              }),
            })

            onSuccess()
          }}
          onError={(err) => {
            console.error('PayPal error:', err)
          }}
        />
      </div>
    </PayPalScriptProvider>
  )
}