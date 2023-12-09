'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LogoWithBaseline from '@/components/Logos/LogoWithBaseline'
import Button from '@/components/ui/Button'
import ErrorInput from '@/components/ui/ErrorInput'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import { Colors } from '@/types/Colors.d'

interface SignUpFormInputs {
  firstname: string
  email: string
  password: string
}

const loginValidation = z.object({
  firstname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

const SignUpView = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(loginValidation),
  })

  const onSubmit = async (data: SignUpFormInputs) => {
    console.log('coucou')
  }

  return (
    <main className="w-screen h-screen bg-secondary-500 px-8 py-8 flex flex-col justify-evenly items-center">
      <LogoWithBaseline color={Colors.WHITE} height={76} />

      <div className="w-full p-8 bg-secondary-600 rounded-2xl">
        <h1 className="text-white text-center mb-6 font-light text-3xl">
          Sign up
        </h1>
        <form
          className="mt-2 flex flex-col items-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col self-stretch">
            <Label
              name="Firstname"
              htmlFor="firstname"
              className="text-white"
            />
            <Input
              {...register('firstname')}
              type="text"
              id="firstname"
              required
            />
          </div>

          <div className="flex flex-col self-stretch">
            <Label name="Email" htmlFor="email" className="text-white" />
            <Input {...register('email')} type="email" id="email" required />
          </div>

          <div className="flex flex-col self-stretch">
            <Label name="Password" htmlFor="password" className="text-white" />
            <Input
              {...register('password')}
              type="password"
              id="password"
              required
            />
          </div>

          <Button
            disabled={!isValid}
            type="submit"
            className="mt-8 disabled:bg-secondary-800 disabled:text-secondary-200"
          >
            Sign up
          </Button>
          <ErrorInput error={errors.root?.message || ''} />
        </form>
      </div>
    </main>
  )
}

export default SignUpView
