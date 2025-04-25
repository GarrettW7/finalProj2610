import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import {createHashRouter, RouterProvider} from 'react-router';
import { TodoList } from './pages/TodoList.jsx'
import { CreateTodo } from './pages/CreateTodo.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/", // this matches the root of the Layout
        element: <TodoList />
      },
      {
        path: "new",
        element: <CreateTodo />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
