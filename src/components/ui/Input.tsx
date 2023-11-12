'use client'

import cn from '@/utils/cn'
import {
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, type, placeholder, ...props },
  ref
) {
  const [value, setValue] = useState<typeof props.value>(props.value ?? '')

  useEffect(() => {
    setValue(props.value ?? '')
  }, [props.value])

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value)
    if (props.onChange) props.onChange(e)
  }

  return (
    <input
      {...props}
      ref={ref}
      type={type}
      className={cn(
        'bg-white rounded-lg p-3 text-secondary-600 placeholder-secondary-200',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
})

export default Input
