'use client'

import cn from '@/utils/cn'
import {
  ChangeEventHandler,
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    label: string
    value: any
  }[]
}

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, placeholder, options, ...props },
  ref
) {
  const [value, setValue] = useState<typeof props.value>()

  const handleChange: ChangeEventHandler<HTMLSelectElement> = e => {
    if (e.target.value) setValue(e.target.value)
  }

  return (
    <select
      {...props}
      ref={ref}
      className={cn(
        'bg-white rounded-lg p-3 text-secondary-600 placeholder-secondary-200',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    >
      <option defaultValue={undefined}>-</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
})

export default Select
