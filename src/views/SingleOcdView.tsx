import MainLayout from '@/components/Layout/MainLayout'
import { Ocd } from '@/types/ocd'

type Props = { ocd: Ocd }

//TODO: Edit mode
//TODO: subcomponent for styling

const SingleOcdView = ({ ocd }: Props) => {
  const {
    name,
    date,
    category,
    location,
    description,
    repetition,
    timeLost,
    intensity,
  } = ocd

  return (
    <MainLayout>
      <div>
        <div className="mb-4">
          <p className="text-secondary-500">{date}</p>
          <h1 className="text-primary-500 text-3xl leading-none font-bold">
            {name}
          </h1>
        </div>
        <div className="bg-secondary-50 px-5 py-7 grid grid-cols-2 gap-4 rounded-2xl">
          <div className="text-secondary-500 col-span-1">
            <p className="text-primary-500">CATEGORY</p>
            <p>{category.toLowerCase()}</p>
          </div>
          <div className="text-secondary-500 col-span-1">
            <p className="text-primary-500">LOCATION</p>
            <p>{location.toLowerCase()}</p>
          </div>
          <div className="text-secondary-500 col-span-2">
            <p className="text-primary-500">DETAILS</p>
            <p>{description || '-'}</p>
          </div>
          <div className="text-secondary-500 col-span-1">
            <p className="text-primary-500">REPETITION</p>
            <p>{repetition || '-'}</p>
          </div>
          <div className="text-secondary-500 col-span-1">
            <p className="text-primary-500">TIME LOST</p>
            <p>{timeLost ? `${timeLost} minutes` : '-'}</p>
          </div>
          <div className="text-secondary-500 col-span-1">
            <p className="text-primary-500">INTENSITY</p>
            <p className="text-xl tracking-widest">
              <span className="text-4xl font-semibold">{intensity}</span>/5
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SingleOcdView
