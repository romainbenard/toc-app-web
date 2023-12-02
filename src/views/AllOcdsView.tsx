'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import MainLayout from '@/components/Layout/MainLayout'
import { Ocd } from '@/types/ocd'

type Props = { user: Session['user']; ocds: { number: number; ocds: Ocd[] } }

const AllOcdsView = ({ ocds }: Props) => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold">My ocds</h1>

      {ocds.number > 0 ? (
        <ul className="text-black">
          {ocds.ocds.map(ocd => (
            <li key={ocd.id}>{`${ocd.name} : ${ocd.date}`}</li>
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
