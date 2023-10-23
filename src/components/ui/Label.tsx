import cn from '@/utils/cn'
import { FC, LabelHTMLAttributes } from 'react'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  name: string
}

const Label: FC<Props> = ({ name, className, ...props }) => {
  return (
    <label
      className={cn('text-secondary-600 text-sm mb-1', className)}
      {...props}
    >
      {name}
    </label>
  )
}

export default Label
