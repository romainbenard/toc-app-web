'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import MainLayout from '@/components/Layout/MainLayout'
import { Ocd } from '@/types/ocd'

type Props = { user: Session['user']; ocds: Ocd[] }

const AllOcdsView = ({ ocds }: Props) => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold">My ocds</h1>

      {ocds.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-3">
          {ocds.map(ocd => (
            <li
              key={ocd.id}
              className="rounded-lg bg-secondary-50 text-secondary-500 p-4"
            >
              <Link href={`/ocds/${ocd.id}`}>
                <p className="text-primary-500 text-xs">
                  {ocd.date} | {ocd.category.toUpperCase()}
                </p>
                <p>{ocd.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Link href="/ocds/new" className="text-black">
          Add my first ocd
        </Link>
      )}
    </MainLayout>
  )
}

export default AllOcdsView
