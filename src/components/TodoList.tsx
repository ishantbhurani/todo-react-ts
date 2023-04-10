import { useEffect, useMemo, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import iconCross from '../assets/icon-cross.svg'
import iconCheck from '../assets/icon-check.svg'
import Filter, { FilterType } from './Filter'
import { db } from '../firebase'
import { Filters } from '../utils'
import { useAuth } from '../context/AuthContext'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'

type TodoType = {
  id: string
  task: string
  completed: boolean
}

export default function TodoList({ filter, setFilter }: FilterType) {
  const { currentUser } = useAuth()
  const [todos, setTodos] = useState([] as TodoType[] | null)

  const filteredTodos = useMemo(() => {
    return filter === Filters.All
      ? todos
      : todos?.filter(todo => todo.completed === (filter === Filters.Completed))
  }, [todos, filter])

  async function toggleCompleted(id: string) {
    const todo = todos?.find(todo => todo.id === id)
    await updateDoc(doc(db, 'todos', id), { completed: !todo?.completed })
  }

  async function deleteTodo(id: string) {
    await deleteDoc(doc(db, 'todos', id))
  }

  async function clearCompleted() {
    todos?.filter(todo => todo.completed).forEach(todo => deleteTodo(todo.id))
  }

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, 'todos'),
        where('uid', '==', currentUser.uid)
      )
      const unsub = onSnapshot(q, querySnapshot => {
        const todos: TodoType[] = []
        querySnapshot.forEach(doc => {
          todos.push({ id: doc.id, ...doc.data() } as TodoType)
        })
        setTodos(todos)
      })
      return () => unsub()
    }
  }, [])

  if (!filteredTodos || filteredTodos.length < 1) {
    return (
      <section className='mt-4 rounded bg-white shadow-lg dark:bg-[#25273c]'>
        <h2 className='border-b border-[#d2d3db] px-5 py-3.5 text-center text-sm text-[#9394a5] dark:border-[#4d5066] dark:text-[#777a92] md:px-6 md:py-5 md:text-xl'>
          All done! 🥳 🎉
        </h2>
        <div className='flex items-center justify-between px-5 py-3.5 text-xs text-[#9394a5] dark:text-[#4d5066] md:text-sm'>
          <p>{todos?.filter(todo => !todo.completed).length} items left</p>
          <div className='hidden md:flex md:items-center md:justify-center'>
            <Filter filter={filter} setFilter={setFilter} />
          </div>
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </section>
    )
  }

  // DRAG AND DROP
  // Function to update list on drop
  function handleDrop(droppedItem: DropResult) {
    if (todos) {
      // Ignore drop outside droppable container
      if (!droppedItem.destination) return
      var updatedList = [...todos]
      // Remove dragged item
      const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1)
      // Add dropped item
      updatedList.splice(droppedItem.destination.index, 0, reorderedItem)
      // Update State
      setTodos(updatedList)
    }
  }

  return (
    <section className='mt-4 rounded bg-white shadow-lg dark:bg-[#25273c]'>
      {/* TODO */}
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId='list-container'>
          {provided => (
            <ul
              className='list-container'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos?.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {provided => (
                    <li
                      // key={todo.id}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className='item-container group flex items-center justify-between border-b border-[#d2d3db] px-5 py-3.5 dark:border-[#4d5066] md:px-6 md:py-5'
                    >
                      <label className='flex cursor-pointer items-center gap-3 md:gap-6'>
                        <input
                          type='checkbox'
                          checked={todo.completed}
                          onChange={e => toggleCompleted(todo.id)}
                          className='sr-only'
                        />
                        <span
                          aria-hidden='true'
                          className={`relative flex h-[18px] w-[18px] cursor-pointer items-center justify-center overflow-hidden rounded-full p-px before:h-full before:w-full before:rounded-full hover:bg-gradient-to-br hover:from-[#57ddff] hover:to-[#c058f3] md:h-[22px] md:w-[22px] ${
                            todo.completed
                              ? 'bg-gradient-to-br from-[#57ddff] to-[#c058f3] before:absolute'
                              : 'bg-[#d2d3db] before:bg-white dark:bg-[#4d5066] dark:before:bg-[#25273c]'
                          }`}
                        >
                          {todo.completed && (
                            <img
                              src={iconCheck}
                              alt=''
                              className=' z-10 w-[10px] md:w-auto'
                            />
                          )}
                        </span>
                        <span
                          className={`text-xs md:text-lg ${
                            todo.completed
                              ? 'text-[#9394a5] line-through dark:text-[#777a92]'
                              : 'text-[#484b6a] dark:text-[#cacde8] dark:hover:text-[#e4e5f1]'
                          }`}
                        >
                          {todo.task}
                        </span>
                      </label>
                      <button
                        aria-label={`delete "${todo.task}" todo`}
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <img
                          src={iconCross}
                          alt='Cross'
                          className='w-2.5 group-hover:visible md:invisible md:w-auto'
                        />
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className='flex items-center justify-between px-5 py-3.5 text-xs text-[#9394a5] dark:text-[#4d5066] md:text-sm'>
        <p>{todos?.filter(todo => !todo.completed).length} items left</p>
        <div className='hidden md:flex md:items-center md:justify-center'>
          <Filter filter={filter} setFilter={setFilter} />
        </div>
        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </section>
  )
}
