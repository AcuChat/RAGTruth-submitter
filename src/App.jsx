import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement, counterSetValue } from './store/sliceCounter';
import axios from 'axios';
import { infoSetResponse, infoSetSourceInfo } from './store/sliceInfo';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  
  

  useEffect(() => {
   axios.get("https://acurai.ai:5100/tables")
   .then(response => console.log(response.data))
   .catch(err => console.error(err));
  }, [])
  return (
    <>
      <div onClick={() => dispatch(counterIncrement())}>+</div>
      <div>{count}</div>
      <div onClick={() => dispatch(counterDecrement())}>-</div>
      <input type="number" onChange={e => dispatch(counterSetValue(e.target.value))} />
    </>
  )
}

export default App
