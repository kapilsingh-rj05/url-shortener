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
import VerifySession from "./components/VerifySession.jsx"
import OtpForm from "./components/OtpForm.jsx"
import PostOTP from "./pages/PostOTP.jsx"
import TrackClicks from "./pages/TrackClicks.jsx"
import Pricing from "./pages/Pricing.jsx"
import Features from "./pages/Features.jsx"

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"/",
      element:
      <VerifySession>
        <Home/>
      </VerifySession>
    },
    {
      path:"/Login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },{
      path:"/register/otp",
      element:<OtpForm/>
    },{
      path:"/register/postVerification",
      elementL:<PostOTP/>
    },{
      path:"/click-tracking",
      element:<TrackClicks/>
    },{
      path:"/pricing",
      element:<Pricing/>
    },{
      path:"/features",
      element:<Features/>
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
