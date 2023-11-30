import MainLayout from '@/components/Layout/MainLayout'
import Link from 'next/link'
import { Session } from 'next-auth'

type Props = { user: Session['user'] }

const DashboardView = ({ user }: Props) => {
  return (
    <MainLayout>
      <div className="h-full flex flex-col items-center justify-center p-8 gap-8">
        <h1 className="text-secondary-500">Hello {user?.name} !</h1>

        <Link href="/ocd/new">
          <div className="flex justify-center items-center h-12 w-12 rounded-[50%] bg-primary-500 text-white font-semibold text-4xl">
            +
          </div>
        </Link>
      </div>
    </MainLayout>
  )
}

export default DashboardView
