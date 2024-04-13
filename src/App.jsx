import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { counterDecrement, counterIncrement, counterSetValue } from './store/sliceCounter';
import axios from 'axios';
import { infoSetResponse, infoSetSourceInfo, infoSetTables } from './store/sliceInfo';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  
  

  useEffect(() => {
   axios.get("https://acurai.ai:5100/tables")
   .then(response => {
    const tables = response.data.map(t => t.Tables_in_ragtruth);
    dispatch(infoSetTables(tables));

   })
   .catch(err => console.error(err));
  }, [])
  return (
    <>
      <div className="selectContainer">
        <select name="tables" id="tables">

        </select>
      </div>
      <input type="number" onChange={e => dispatch(counterSetValue(e.target.value))} />
    </>
  )
}

export default App
