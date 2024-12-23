import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

function Counter() {
  const data = useSelector((state)=>state.Count);
  const dispatch = useDispatch()
  return (
    <div>
        <h1>{data}</h1>
        <button onClick={()=>dispatch({type:'increment'})}>+</button>
        <button onClick={()=>dispatch({type:'decrement'})}>-</button>

        <h style={{color:'red'}}>color</h>
        <button></button>
    </div>
  )
}

export default Counter

