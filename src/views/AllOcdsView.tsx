'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import MainLayout from '@/components/layouts/MainLayout'
import OcdListItem from '@/components/ocd/OcdListItem'
import FixedAddCTA from '@/components/ui/FixedAddCTA'
import { Ocd } from '@/types/ocd'

type Props = { user: Session['user']; ocds: Ocd[] }

//TODO: Cursor based pagination + infinite scroll
//TODO: Add FilterBy (category, date, location)

const AllOcdsView = ({ ocds }: Props) => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-semibold">My ocds</h1>

      <ul className="mt-4 flex flex-col gap-3">
        {ocds.map(ocd => (
          <OcdListItem key={ocd.id} ocd={ocd} />
        ))}
      </ul>

      {ocds.length > 0 ? (
        <FixedAddCTA />
      ) : (
        <Link href="/ocds/new" className="text-black">
          Add my first ocd
        </Link>
      )}
    </MainLayout>
  )
}

export default AllOcdsView
