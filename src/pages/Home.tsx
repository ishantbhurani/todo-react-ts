import { useEffect, useState } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import TodoList from '../components/TodoList'
import Filter from '../components/Filter'
import { Filters } from '../utils'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { currentUser } = useAuth()
  const [filter, setFilter] = useState(Filters.All)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) navigate('login', { replace: true })
  }, [currentUser])

  return (
    <>
      <main className='wrapper'>
        {currentUser && currentUser.displayName && (
          <p className='mt-7 text-[#d2d3db] md:text-xl'>
            Welcome {currentUser.displayName.split(' ')[0]}, what will you do
            today? 💪
          </p>
        )}
        <AddTodoForm />
        <TodoList filter={filter} setFilter={setFilter} />
        <div className='mt-4 rounded bg-white px-5 py-3.5 shadow-lg dark:bg-[#25273c] md:hidden'>
          <Filter filter={filter} setFilter={setFilter} />
        </div>
      </main>
      <footer className='wrapper my-11 flex items-center justify-center text-center'>
        <p className='text-sm text-[#9394a5] dark:text-[#4d5066]'>
          Drag and drop to reorder list
        </p>
      </footer>
    </>
  )
}
