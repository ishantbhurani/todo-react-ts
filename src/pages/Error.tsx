import { Link, useNavigate, useRouteError } from 'react-router-dom'
import homeIcon from '../assets/icon-home.svg'
import ArrowUturnLeftIcon from '../assets/icon-arrow-uturn-left.svg'

export default function Error() {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <main className='wrapper mt-8 text-white'>
      <h2 className='text-lg md:text-2xl'>Uh oh! We've got a problem.</h2>
      <p className='text-sm text-[#cacde8] md:text-xl'>
        {error.message || error.statusText}
      </p>
      <div className='mt-6 flex items-center gap-6 text-xs md:text-base'>
        <button
          className='flex items-center justify-center gap-2 rounded bg-[#25273c] px-5 py-2.5 focus:outline-none focus-visible:ring'
          onClick={() => navigate(-1)}
        >
          <img src={ArrowUturnLeftIcon} alt='' className='w-5' />
          <span className='mt-1'>Go Back</span>
        </button>
        <Link
          to='/'
          className='flex items-center justify-center gap-2 rounded bg-[#3a7bfd] px-5 py-2.5 focus:outline-none focus-visible:ring'
        >
          <img src={homeIcon} alt='' className='w-5' />
          <span className='mt-1'>Go Home</span>
        </Link>
      </div>
    </main>
  )
}
