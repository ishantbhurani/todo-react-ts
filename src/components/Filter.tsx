import { Dispatch, SetStateAction } from 'react'
import { Filters } from '../utils'

export type FilterType = {
  filter: Filters
  setFilter: Dispatch<SetStateAction<Filters>>
}

export default function Filter({ filter, setFilter }: FilterType) {
  return (
    <form className='flex items-center justify-center gap-4'>
      {Object.keys(Filters).map(f => (
        <label key={f}>
          <input
            type='radio'
            name='filter'
            id={`filter${f}`}
            value={f}
            checked={filter === f}
            onChange={e => setFilter(e.target.value as Filters)}
            className='sr-only'
          />
          <span
            className={`cursor-pointer text-sm font-bold ${
              filter === f
                ? 'text-[#3a7bfd]'
                : 'text-[#9394a5] dark:text-[#4d5066]'
            }`}
          >
            {f}
          </span>
        </label>
      ))}
    </form>
  )
}
