import React,{useEffect, useState} from 'react'
import axios from "axios"
import Login from "./Login"
import {useSelector} from "react-redux"
import DecodeForm from '../components/DecodeForm'
import EncodeForm from "../components/EncodeForm"
import FormatURL from "../components/FormatURL"

const Home = () => {

  const isLogin = useSelector((state)=>state.auth.status)

  const [urls, setUrls] = useState([])

  useEffect(()=>{
    if(isLogin){
      axios.get("/user/getUrls")
      .then((response)=>{
        setUrls(response.data)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }, [isLogin])

  return (
    <div>
        {!isLogin && <Login/>}

        {isLogin && <div>
          <EncodeForm/>
          <DecodeForm/>
          <div className="mb-6 flex flex-col gap-1 border-b border-slate-200/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans sm:text-2xl">
                All URLs created by <span className="bg-gradient-to-r region bg-clip-text text-transparent from-indigo-600 to-blue-600">you</span>
              </h1>
              <p className="text-xs font-medium text-slate-400 sm:text-sm">
                Manage, copy, and track the analytics of your shortened links.
              </p>
            </div>
          </div>
          {urls.map((url)=>(
            <FormatURL key={url._id} originalUrl={url.redirectUrl} shortUrl={url.shortId} createdAt={url.createdAt}/>
            // console.log(url)
          ))}
          </div>}
    </div>
  )
}

export default Home