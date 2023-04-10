import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from 'react-router-dom'
import { auth } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import errorIcon from '../assets/icon-error.svg'

export async function registerAction({ request }: { request: Request }) {
  const formData = await request.formData()
  const user = Object.fromEntries(formData)

  // register new user on firebase auth
  try {
    await createUserWithEmailAndPassword(
      auth,
      user.email.toString(),
      user.password.toString()
    )

    if (auth.currentUser) {
      // set displayName
      await updateProfile(auth.currentUser, {
        displayName: user.name.toString(),
      })
    }
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        return { error: 'Email already registerd with an account' }
      default:
        throw new Error('Could not register new user, try again later.')
    }
  }

  return redirect('/')
}

export default function Register() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const data = useActionData() as { error?: string }

  useEffect(() => {
    if (currentUser) navigate('/', { replace: true })
  }, [currentUser])

  return (
    <Form
      method='post'
      className='wrapper mt-7 rounded bg-white p-7 text-[#484b6a] shadow-lg dark:bg-[#25273c] dark:text-[#cacde8]'
    >
      {data && data.error && (
        <div className='mb-4 flex items-center gap-2 text-sm text-red-400 md:text-base'>
          <img src={errorIcon} alt='' className='w-5' />
          <span className='mt-1'>{data.error ?? 'something'}</span>
        </div>
      )}

      <div className='mb-6'>
        <label
          htmlFor='name'
          className='mb-2 block text-xs font-bold md:text-sm'
        >
          Your Name
        </label>
        <div className='rounded bg-[#d2d3db] p-px focus-within:bg-gradient-to-br focus-within:from-[#57ddff] focus-within:to-[#c058f3] hover:bg-gradient-to-br hover:from-[#57ddff] hover:to-[#c058f3] dark:bg-[#4d5066]'>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Jane Doe'
            required
            className='w-full rounded bg-white p-2.5 text-sm placeholder:text-[#d2d3db] focus:outline-none dark:bg-[#25273c]  dark:placeholder:text-[#777a92] md:text-lg'
          />
        </div>
      </div>

      <div className='mb-6'>
        <label
          htmlFor='email'
          className='mb-2 block text-xs font-bold md:text-sm'
        >
          Your Email
        </label>
        <div className='rounded bg-[#d2d3db] p-px focus-within:bg-gradient-to-br focus-within:from-[#57ddff] focus-within:to-[#c058f3] hover:bg-gradient-to-br hover:from-[#57ddff] hover:to-[#c058f3] dark:bg-[#4d5066]'>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='janedoe@mail.com'
            required
            className='w-full rounded bg-white p-2.5 text-sm placeholder:text-[#d2d3db] focus:outline-none  dark:bg-[#25273c] dark:placeholder:text-[#777a92] md:text-lg'
          />
        </div>
      </div>

      <div className='mb-6'>
        <label
          htmlFor='password'
          className='mb-2 block text-xs font-bold md:text-sm'
        >
          Your Password
        </label>
        <div className='rounded bg-[#d2d3db] p-px focus-within:bg-gradient-to-br focus-within:from-[#57ddff] focus-within:to-[#c058f3] hover:bg-gradient-to-br hover:from-[#57ddff] hover:to-[#c058f3] dark:bg-[#4d5066]'>
          <input
            type='password'
            name='password'
            id='password'
            pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
            placeholder='8+ characters, 1+ letters, and 1+ numbers'
            required
            className='w-full rounded bg-white p-2.5 text-sm placeholder:text-[#d2d3db] focus:outline-none  dark:bg-[#25273c] dark:placeholder:text-[#777a92] md:text-lg'
          />
        </div>
      </div>

      <button
        type='submit'
        className='mb-6 block w-full rounded border border-transparent bg-[#3a7bfd] px-5 py-2.5 text-center text-sm text-white transition duration-300 hover:border-[#3a7bfd] hover:bg-white hover:text-[#3a7bfd] focus:outline-none focus-visible:border-[#3a7bfd] focus-visible:bg-white focus-visible:text-[#3a7bfd] dark:hover:bg-[#25273c] dark:focus-visible:bg-[#25273c] md:w-auto md:text-lg'
      >
        Register
      </button>

      <p>
        Already registered?{' '}
        <Link
          to='/login'
          className='font-bold text-[#3a7bfd] focus:outline-none focus:ring'
        >
          Login
        </Link>
        .
      </p>
    </Form>
  )
}
