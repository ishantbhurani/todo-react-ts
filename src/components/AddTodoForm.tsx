import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'

export default function AddTodoForm() {
  const { currentUser } = useAuth()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    if (currentUser) {
      const newTodo = {
        task: formData.get('newTodo') as string,
        completed: false,
        uid: currentUser.uid,
      }

      form.reset()

      await addDoc(collection(db, 'todos'), newTodo)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-4 flex items-center gap-3 rounded bg-white px-5 py-3.5 dark:bg-[#25273c] md:mt-6 md:gap-6 md:px-6 md:py-5'
    >
      <span className='h-[18px] w-[18px] rounded-xl border border-[#d2d3db] dark:border-[#4d5066] md:h-[22px] md:w-[22px]'></span>
      <input
        type='text'
        name='newTodo'
        id='newTodo'
        placeholder='Create a new todo...'
        required
        className='flex-1 bg-transparent text-xs text-[#484b6a] placeholder:text-[#d2d3db] focus:outline-none dark:text-[#cacde8] dark:placeholder:text-[#777a92] md:text-lg'
      />
    </form>
  )
}
