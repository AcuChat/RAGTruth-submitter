import { useEffect, useState } from 'react'
import './App.css'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { infoSetTables } from './store/sliceInfo';

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  const info = useSelector(state => state.info);
  
  const getTableInfo = tableName => {
    console.log(tableName);
  }

  let accuracy = 0;

  useEffect(() => {
   axios.get("https://acurai.ai:5100/tables")
   .then(response => {
    const tables = response.data.map(t => t.Tables_in_ragtruth);
    dispatch(infoSetTables(tables));
    if (tables.length) getTableInfo(tables[0]);

   })
   .catch(err => console.error(err));
  }, [])
  return (
    <>
      <h1 className="text-blue-600 mb-4">Accuracy {accuracy}%</h1>
      <div className="selectContainer">
        <select name="tables" id="tables" onChange={e => getTableInfo(e.target.value)} className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {info.tables.map((t, i) => {
            return <option key={t} value={t}>{t}</option>
          })}
        </select>
      </div>
      <input type="number" onChange={e => dispatch(counterSetValue(e.target.value))} />
    </>
  )
}

export default App
