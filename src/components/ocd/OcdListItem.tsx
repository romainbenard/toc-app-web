import Link from 'next/link'
import { Ocd } from '@/types/ocd'

type Props = {
  ocd: Ocd
}

const OcdListItem = ({ ocd }: Props) => {
  return (
    <li className="rounded-lg bg-secondary-50 text-secondary-500 border-transparent hover:border-secondary-200 border-2 transition-all">
      <Link className="block p-4" href={`/ocds/${ocd.id}`}>
        <p className="text-primary-500 text-xs">
          {ocd.date} | {ocd.category.toUpperCase()}
        </p>
        <p>{ocd.name}</p>
      </Link>
    </li>
  )
}

export default OcdListItem
