import { FC, HTMLAttributes } from 'react'
import cn from '@/utils/cn'

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  error: string
}

const ErrorInput: FC<Props> = ({ error, className, ...props }) => {
  return (
    <p className={cn('my-2 text-error text-sm', className)} {...props}>
      {error}
    </p>
  )
}

export default ErrorInput
