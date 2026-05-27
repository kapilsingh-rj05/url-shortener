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
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    if(isLogin || refresh){
      axios.get("/user/getUrls")
      .then((response)=>{
        setUrls(response.data)
        setRefresh(false)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }, [isLogin, refresh])

  return (
    <div>
        {!isLogin && <Login/>}

        {isLogin && <div>
          <EncodeForm/>
          <DecodeForm/>
          <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-sans sm:text-2xl">
                All URLs created by <span className="bg-gradient-to-r region bg-clip-text text-transparent from-indigo-600 to-blue-600">you</span>
              </h1>
              <p className="text-xs font-medium text-slate-400 sm:text-sm">
                Manage, copy, and track the analytics of your shortened links.
              </p>
            </div>
            
            <button className="self-start rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 hover:shadow active:scale-95 sm:self-center sm:text-sm" onClick={()=>setRefresh(true)}>
              REFRESH
            </button>
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