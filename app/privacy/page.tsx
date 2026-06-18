import PageHeader from '@/components/PageHeader'

const sections = [
  {
    title: '1. Introduction',
    body: `VeggieStack (Pty) Ltd ("VeggieStack", "we", "us") is committed to protecting your personal information in accordance with the Protection of Personal Information Act, 2013 (POPIA). This policy explains what information we collect, why we collect it, and how it is used, stored and protected.`,
  },
  {
    title: '2. Information We Collect',
    body: `We collect information you provide directly — such as your name, email address, phone number, delivery address and payment details — when you create an account, place an order, or contact us. We also collect order history and, with your consent, marketing preferences.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `Your information is used to process and deliver your orders, communicate order updates, provide customer support, improve our service, and — only where you have opted in — send you marketing communications. We do not sell your personal information.`,
  },
  {
    title: '4. Legal Basis for Processing',
    body: `We process your personal information on the basis of: performance of a contract (fulfilling your order), your consent (marketing communications), and our legitimate business interests (fraud prevention, service improvement), consistent with POPIA's conditions for lawful processing.`,
  },
  {
    title: '5. Sharing Your Information',
    body: `We share information only where necessary: with delivery partners to fulfil your order, with payment processors (PayFast, PayPal) to process transactions securely, and with service providers who support our operations under confidentiality obligations. We do not share your information with third parties for their own marketing purposes.`,
  },
  {
    title: '6. Data Security',
    body: `We implement appropriate technical and organisational measures — including encrypted connections, access controls and secure hosting — to protect your personal information against loss, unauthorised access, and disclosure.`,
  },
  {
    title: '7. Data Retention',
    body: `We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law (for example, financial record-keeping obligations).`,
  },
  {
    title: '8. Your Rights Under POPIA',
    body: `You have the right to access the personal information we hold about you, request correction or deletion of inaccurate or outdated information, object to processing for direct marketing, and withdraw consent at any time. To exercise these rights, contact our Information Officer using the details below.`,
  },
  {
    title: '9. Cookies',
    body: `Our website uses cookies to keep you signed in, remember your cart, and understand site usage. You can control cookies through your browser settings.`,
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this policy from time to time. Material changes will be communicated via email or a notice on our website.`,
  },
  {
    title: '11. Contact Us / Information Officer',
    body: `For any privacy-related queries or to exercise your rights under POPIA, contact our Information Officer at hello@veggiestack.co.za or +27 21 000 0000.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <PageHeader title="Privacy Policy" description="How VeggieStack collects, uses and protects your personal information, in line with POPIA." />

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
