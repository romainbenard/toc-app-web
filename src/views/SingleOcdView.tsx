import MainLayout from '@/components/Layout/MainLayout'
import { Ocd } from '@/types/ocd'

type Props = { ocd: Ocd }

const SingleOcdView = ({ ocd }: Props) => {
  return (
    <MainLayout>
      <ul className="text-black">
        {Object.entries(ocd).map(entry => (
          <li key={entry[0]}>{`${entry[0]}: ${entry[1]}`}</li>
        ))}
      </ul>
    </MainLayout>
  )
}

export default SingleOcdView
