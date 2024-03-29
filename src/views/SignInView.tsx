'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, SignInOptions } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProvidersSignInList } from '@/app/auth/signin/page'
import ErrorInput from '@/components/form/ErrorInput'
import Input from '@/components/form/Input'
import Label from '@/components/form/Label'
import LogoWithBaseline from '@/components/logos/LogoWithBaseline'
import Button from '@/components/ui/Button'
import RoundedBlock from '@/components/ui/RoundedBlock'
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

const SignInView = ({ providers }: Props) => {
  const router = useRouter()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginValidation),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    })

    if (!res?.ok) return setError('root', { message: 'An error occured' })

    router.replace('/dashboard')
  }

  return (
    <main className="w-screen h-screen bg-secondary-500 px-8 py-8 flex flex-col justify-evenly items-center">
      <LogoWithBaseline color={Colors.WHITE} />
      <RoundedBlock className="bg-secondary-600 h-fit">
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
          <ErrorInput error={errors.root?.message || ''} />
        </form>
        <p className="mt-2 text-xs text-center underline text-secondary-50">
          <Link href="/auth/signup">Sign up with email here</Link>
        </p>
      </RoundedBlock>

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

export default SignInView
