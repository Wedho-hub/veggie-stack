import PageHeader from '@/components/PageHeader'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using the VeggieStack website and placing an order, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.`,
  },
  {
    title: '2. Eligibility & Accounts',
    body: `You must be at least 18 years old to place an order. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.`,
  },
  {
    title: '3. Orders & Payment',
    body: `All orders are subject to acceptance and availability. Payment is processed securely at checkout via PayFast or PayPal. Prices are listed in South African Rand (ZAR) and include applicable VAT where relevant.`,
  },
  {
    title: '4. Pricing & Product Availability',
    body: `We make every effort to display accurate pricing and stock levels. Because much of our stock is seasonal and farm-direct, availability can change quickly — we will notify you and offer a substitute or refund if an item in your order is unavailable.`,
  },
  {
    title: '5. Delivery',
    body: `Orders placed before 10am SAST are delivered the same day; orders placed after 10am are delivered the next business day. Delivery is free on orders over R500 and a flat R50 fee applies below that. See our Delivery page for full details and serviced suburbs.`,
  },
  {
    title: '6. Cancellations',
    body: `Orders may be cancelled free of charge before the 10am cutoff on the day of delivery. Once an order has been picked and dispatched, it cannot be cancelled, but our Refunds Policy applies if there is an issue with your delivery.`,
  },
  {
    title: '7. Intellectual Property',
    body: `All content on this website — including text, graphics, logos and images — is the property of VeggieStack (Pty) Ltd or its licensors and may not be reproduced without permission.`,
  },
  {
    title: '8. User Conduct',
    body: `You agree not to misuse the website, attempt unauthorised access to our systems, or use the service for any unlawful purpose.`,
  },
  {
    title: '9. Limitation of Liability',
    body: `VeggieStack is not liable for indirect or consequential losses arising from use of our service, to the maximum extent permitted by South African law. Our liability for any claim is limited to the value of the relevant order.`,
  },
  {
    title: '10. Governing Law',
    body: `These Terms are governed by the laws of the Republic of South Africa. Any disputes will be subject to the jurisdiction of the South African courts.`,
  },
  {
    title: '11. Changes to These Terms',
    body: `We may update these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.`,
  },
  {
    title: '12. Contact',
    body: `For questions about these Terms, contact us at hello@veggiestack.co.za or +27 21 000 0000.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader title="Terms of Service" description="The terms that govern your use of VeggieStack and your orders with us." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-xs text-gray-400 mb-10">Last updated: 1 June 2026</p>
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
