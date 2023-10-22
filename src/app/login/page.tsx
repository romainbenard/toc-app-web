import Input from '@/components/form/Input'
import LogoWithBaseline from '@/components/ui/LogoWithBaseline'
import { Colors } from '@/types/Colors.d'

const LoginPage = () => {
  return (
    <main className="w-screen h-screen bg-secondary-500 flex flex-col items-center justify-center">
      <LogoWithBaseline color={Colors.WHITE} />

      <form className="mt-8">
        <Input type="text" />
      </form>
    </main>
  )
}

export default LoginPage
