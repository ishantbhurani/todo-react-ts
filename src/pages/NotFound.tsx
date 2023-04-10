import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className='wrapper mt-16 text-sm text-white md:text-xl'>
      <h2 className='text-[1.625rem] font-bold tracking-[0.4rem] md:text-[2.5rem]'>
        Page Not Found!
      </h2>
      <p className='mt-8'>Sorry, couldn't find what you were looking for 🤷</p>
      <p className='mt-3'>
        Go to the{' '}
        <Link to='/' className='font-bold underline'>
          Home
        </Link>
        .
      </p>
    </main>
  )
}
