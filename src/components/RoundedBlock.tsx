import React, { PropsWithChildren } from 'react'
import cn from '@/utils/cn'

interface Props extends PropsWithChildren {
  className?: string
}

const RoundedBlock = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        'h-full w-full bg-secondary-50 py-8 px-6 rounded-xl',
        className
      )}
    >
      {children}
    </div>
  )
}

export default RoundedBlock
