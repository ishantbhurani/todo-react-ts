import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

export const AuthContext = createContext({
  currentUser: {} as User | null,
  // setCurrentUser: (_user: User) => {},
})

export function AuthProvider({ children }: { children?: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [setCurrentUser])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
