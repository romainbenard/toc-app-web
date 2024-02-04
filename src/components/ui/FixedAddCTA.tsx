import React from 'react'
import Link from 'next/link'
import CircleAdd from './CircleAdd'

const FixedAddCTA = () => {
  return (
    <Link className="fixed bottom-20 right-4 z-20" href="/ocds/new">
      <CircleAdd />
    </Link>
  )
}

export default FixedAddCTA
