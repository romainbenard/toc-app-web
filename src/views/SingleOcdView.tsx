import MainLayout from '@/components/layouts/MainLayout'
import RoundedBlock from '@/components/ui/RoundedBlock'
import { Ocd } from '@/types/ocd'
import { formatDate } from '@/utils/date'
import { displayLocation, displayTimeLost } from '@/utils/formatters/ocd'

type Props = { ocd: Ocd }

//TODO: Edit mode
//TODO: subcomponent for styling

const SingleOcdView = ({ ocd }: Props) => {
  const { name, date, category, location, description, timeLost, intensity } =
    ocd

  return (
    <MainLayout>
      <div>
        <div className="mb-4">
          <p className="text-secondary-500">{formatDate(date)}</p>
          <h1 className="text-primary-500 text-3xl leading-none font-bold">
            {name}
          </h1>
        </div>
        <RoundedBlock>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-secondary-500 col-span-1">
              <p className="text-primary-500 text-sm">CATEGORY</p>
              <p className="text-lg first-letter:uppercase">
                {category.toLowerCase()}
              </p>
            </div>
            <div className="text-secondary-500 col-span-1">
              <p className="text-primary-500 text-sm">LOCATION</p>
              <p className="text-lg first-letter:uppercase">
                {displayLocation(location)}
              </p>
            </div>
            <div className="text-secondary-500 col-span-2">
              <p className="text-primary-500 text-sm">DETAILS</p>
              <p className="text-lg first-letter:uppercase">
                {description || '-'}
              </p>
            </div>
            <div className="text-secondary-500 col-span-1">
              <p className="text-primary-500 text-sm">TIME LOST</p>
              <p className="text-lg first-letter:uppercase">
                {timeLost ? displayTimeLost(timeLost) : '-'}
              </p>
            </div>
            <div className="text-secondary-500 col-span-1">
              <p className="text-primary-500 text-sm">INTENSITY</p>
              <p className="text-xl tracking-widest">
                <span className="text-4xl font-semibold">{intensity}</span>/5
              </p>
            </div>
          </div>
        </RoundedBlock>
      </div>
    </MainLayout>
  )
}

export default SingleOcdView
