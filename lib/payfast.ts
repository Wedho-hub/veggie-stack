// lib/payfast.ts
import crypto from 'crypto'

// TypeScript: exact shape PayFast expects
export interface PayFastParams {
  merchant_id: string
  merchant_key: string
  return_url: string
  cancel_url: string
  notify_url: string
  name_first: string
  email_address: string
  m_payment_id: string          // your internal order number
  amount: string                // must be string with 2 decimal places
  item_name: string
  item_description?: string
  passphrase?: string
}

// PayFast requires a specific MD5 signature of all params
export function generatePayFastSignature(
  data: Record<string, string>,
  passphrase?: string
): string {
  // Build query string — alphabetically sorted, no empty values
  let queryString = Object.keys(data)
    .filter((key) => key !== 'signature' && data[key] !== '')
    .sort()
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, '+')}`)
    .join('&')

  if (passphrase) {
    queryString += `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`
  }

  return crypto.createHash('md5').update(queryString).digest('hex')
}

// Build the full PayFast redirect URL with signed params
export function buildPayFastUrl(params: PayFastParams): string {
  const isSandbox = process.env.PAYFAST_SANDBOX === 'true'
  const baseUrl = isSandbox
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process'

  const data: Record<string, string> = {
    merchant_id: params.merchant_id,
    merchant_key: params.merchant_key,
    return_url: params.return_url,
    cancel_url: params.cancel_url,
    notify_url: params.notify_url,
    name_first: params.name_first,
    email_address: params.email_address,
    m_payment_id: params.m_payment_id,
    amount: params.amount,
    item_name: params.item_name,
  }

  if (params.item_description) {
    data.item_description = params.item_description
  }

  const signature = generatePayFastSignature(data, params.passphrase)
  data.signature = signature

  const queryString = Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join('&')

  return `${baseUrl}?${queryString}`
}

// Generate a unique order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `VS-${timestamp}-${random}`
}