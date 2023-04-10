import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import iconMoon from '../assets/icon-moon.svg'
import iconSun from '../assets/icon-sun.svg'
import iconPower from '../assets/icon-power.svg'

function Header() {
  const { currentUser } = useAuth()
  const [darkMode, setDarkMode] = useState(localStorage.theme == 'dark')

  function handleThemeSwitch() {
    if (localStorage.theme == 'dark') {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    } else {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <header className='mt-10'>
      <div className='wrapper flex items-center justify-between'>
        <h1 className='text-[1.625rem] font-bold tracking-[0.4rem] text-white md:text-[2.5rem]'>
          TODO
        </h1>
        <div className='flex items-center justify-center gap-4'>
          <button
            aria-label='change app theme'
            onClick={handleThemeSwitch}
            className='focus:outline-none focus-visible:ring'
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            <img
              src={darkMode ? iconSun : iconMoon}
              alt='Moon'
              className='w-5 md:w-[26px]'
            />
          </button>
          {currentUser && (
            <button
              onClick={handleLogout}
              aria-label='logout'
              title='Logout'
              className='focus:outline-none focus-visible:ring'
            >
              <img src={iconPower} alt='logout' className=' w-6 md:w-7' />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
