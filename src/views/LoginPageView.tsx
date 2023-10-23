'use client'

import { Colors } from '@/types/Colors.d'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Input from '@/components/ui/Input'
import LogoWithBaseline from '@/components/Logos/LogoWithBaseline'
import { zodResolver } from '@hookform/resolvers/zod'
import Label from '@/components/ui/Label'
import Button from '@/components/ui/Button'
import ErrorInput from '@/components/ui/ErrorInput'

interface LoginFormInputs {
  email: string
  password: string
}

const loginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const LoginPageView = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginValidation),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <main className="w-screen h-screen bg-secondary-500 flex flex-col items-center justify-center p-8 gap-8">
      <LogoWithBaseline color={Colors.WHITE} />

      <form
        className="mt-8 flex flex-col w-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <Button type="submit" className="mt-8">
          Me connecter
        </Button>
        {(errors.email || errors.password) && (
          <ErrorInput error="Merci de vérifier vos identifiants" />
        )}
      </form>
    </main>
  )
}

export default LoginPageView
