'use client'

import {
  ChangeEventHandler,
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import cn from '@/utils/cn'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(function Input(
  { className, placeholder, ...props },
  ref
) {
  const [value, setValue] = useState<typeof props.value>(props.value ?? '')

  useEffect(() => {
    setValue(props.value ?? '')
  }, [props.value])

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setValue(e.target.value)
    if (props.onChange) props.onChange(e)
  }

  return (
    <textarea
      {...props}
      ref={ref}
      className={cn(
        'bg-white rounded-lg p-3 text-secondary-600 placeholder-secondary-200 mb-4',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      rows={props.rows ?? 3}
    />
  )
})

export default TextArea
