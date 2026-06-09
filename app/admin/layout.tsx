// app/admin/layout.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Belt-and-suspenders check alongside middleware
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}