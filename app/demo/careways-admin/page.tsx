import AdminApp from '@/components/careways/admin/AdminApp'

// Protected by middleware.ts when CAREWAYS_ADMIN_PASSWORD is set (required in production).
export default function CarewaysAdminPage() {
  return <AdminApp />
}
