import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './layouts/Main'
import Home from './pages/Home'
import Login, { loginAction } from './pages/Login'
import Register, { registerAction } from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Error from './pages/Error'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'login',
            element: <Login />,
            action: loginAction,
          },
          {
            path: 'register',
            element: <Register />,
            action: registerAction,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
