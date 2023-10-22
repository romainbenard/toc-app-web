import LogoWithBaseline from '@/components/ui/LogoWithBaseline'
import { Colors } from '@/types/Colors.d'

const LoginPage = () => {
  return (
    <main className="w-screen h-screen bg-secondary-500 flex flex-col items-center justify-center">
      <LogoWithBaseline color={Colors.WHITE} />
    </main>
  )
}

export default LoginPage
