import Input from '@/components/ui/Input'
import LogoWithBaseline from '@/components/Logos/LogoWithBaseline'

const LoginPageView = () => {
  return (
    <main className="w-screen h-screen bg-secondary-500 flex flex-col items-center justify-center">
      <LogoWithBaseline color={Colors.WHITE} />

      <form className="mt-8">
        <Input type="text" />
      </form>
    </main>
  )
}

export default LoginPageView
