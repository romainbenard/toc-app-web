import { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from '@/utils/cn'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, children, ...props },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        'text-white bg-primary-500 text-center font-semibold rounded-md px-6 py-3 my-2 hover:bg-primary-700 hover:text-primary-100 transition-all ',
        className
      )}
    >
      {children}
    </button>
  )
})

export default Button
