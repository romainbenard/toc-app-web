'use client'

import Link from 'next/link'
import { signIn, SignInOptions } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProvidersSignInList } from '@/app/auth/signin/page'
import LogoWithBaseline from '@/components/Logos/LogoWithBaseline'
import Button from '@/components/ui/Button'
import ErrorInput from '@/components/ui/ErrorInput'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import { Colors } from '@/types/Colors.d'

interface LoginFormInputs extends SignInOptions {
  email: string
  password: string
}

const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type Props = {
  providers?: ProvidersSignInList
}

const LoginPageView = ({ providers }: Props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginValidation),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    signIn('credentials', data)
  }

  return (
    <main className="w-screen h-screen bg-secondary-500 px-8 py-8 flex flex-col justify-evenly items-center">
      <LogoWithBaseline color={Colors.WHITE} />
      <div className="w-full">
        <form
          className="mt-2 flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col self-stretch">
            <Label name="Email" htmlFor="email" className="text-white" />
            <Input {...register('email')} type="email" id="email" required />
          </div>

          <div className="flex flex-col self-stretch mt-5">
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
            Me connecter
          </Button>
          {(errors.email || errors.password) && (
            <ErrorInput error="Merci de vérifier vos identifiants" />
          )}
        </form>
        <p className="mt-2 text-xs text-center underline text-secondary-50">
          <Link href="/">Sign up with email here</Link>
        </p>
      </div>

      {providers && (
        <div className="text-center">
          <p>Sign in with: </p>
          <ul className="flex justify-center items-center gap-4">
            {Object.values(providers).map(provider => {
              if (provider.id === 'credentials') return

              return (
                <Button key={provider.name} onClick={() => signIn(provider.id)}>
                  {provider.name}
                </Button>
              )
            })}
          </ul>
        </div>
      )}
    </main>
  )
}

export default LoginPageView
