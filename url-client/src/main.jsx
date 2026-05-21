// main.jsx — before ReactDOM.render/createRoot
import axios from "axios"
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:4000"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import store from './store/store.js'
import {Provider} from "react-redux"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"/",
      element:<Home/>
    },
    {
      path:"/Login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    }]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
