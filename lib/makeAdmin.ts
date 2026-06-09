// lib/makeAdmin.ts
// Usage: MONGODB_URI=... npx ts-node --skip-project lib/makeAdmin.ts your@email.com

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string
const email = process.argv[2]

if (!email) {
  console.error('❌ Provide an email: npx ts-node --skip-project lib/makeAdmin.ts wilfordmtikwiri@gmail.com')
  process.exit(1)
}

async function makeAdmin() {
  await mongoose.connect(MONGODB_URI)

  const UserSchema = new mongoose.Schema({ email: String, role: String }, { strict: false })
  const User = mongoose.models.User || mongoose.model('User', UserSchema)

  const result = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: 'admin' },
    { returnDocument: 'after' }
  )

  if (!result) {
    console.error(`❌ No user found with email: ${email}`)
  } else {
    console.log(`✅ ${email} is now an admin`)
  }

  await mongoose.disconnect()
}

makeAdmin().catch(console.error)