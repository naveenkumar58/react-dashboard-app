import { useEffect, useState } from "react"

const useFetch=(url: string)=>{
    const [data, setData]=useState(null)

    useEffect(()=>{
        fetch(url)
        .then((res) =>res.json())
        .then((val)=>setData(val))
        .catch((err) =>{
            console.log("API failed!", err)
        })
    },[url])

    return [data]
}

export default useFetch