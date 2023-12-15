'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ErrorInput from '@/components/form/ErrorInput'
import Input from '@/components/form/Input'
import Label from '@/components/form/Label'
import LogoWithBaseline from '@/components/logos/LogoWithBaseline'
import Button from '@/components/ui/Button'
import RoundedBlock from '@/components/ui/RoundedBlock'
import { ApiResponse } from '@/types/ApiServer'
import { Colors } from '@/types/Colors.d'
import { User } from '@/types/User'
import fetchAppInstance from '@/utils/fetchAppInstance'

interface SignUpFormInputs {
  name: string
  email: string
  password: string
}

const loginValidation = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})

const SignUpView = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitSuccessful },
    handleSubmit,
    setError,
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(loginValidation),
  })

  const onSubmit = async (data: SignUpFormInputs) => {
    const res: ApiResponse<User> = await fetchAppInstance(
      '/users/signup',
      'POST',
      { ...data, loginType: 'credentials', loginProvider: 'credentials' }
    )

    if (!res.success) {
      return setError('root', {
        message: 'A server error occurred, please try again',
      })
    }
  }

  return (
    <main className="w-screen h-screen bg-secondary-500 px-8 py-8 flex flex-col justify-evenly items-center">
      <LogoWithBaseline color={Colors.WHITE} height={76} />

      <RoundedBlock className="bg-secondary-600 h-fit">
        <h1 className="text-white text-center mb-6 font-light text-3xl">
          Sign up
        </h1>
        <form
          className="mt-2 flex flex-col items-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col self-stretch">
            <Label name="Name" htmlFor="name" className="text-white" />
            <Input {...register('name')} type="text" id="name" required />
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

          {isSubmitSuccessful ? (
            <p className="text-center">
              Your account is created, Please{' '}
              <Link className="underline" href="/auth/signin">
                sign in here
              </Link>
            </p>
          ) : (
            <ErrorInput error={errors.root?.message || ''} />
          )}
        </form>
      </RoundedBlock>
    </main>
  )
}

export default SignUpView
