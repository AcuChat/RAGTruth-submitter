import { useEffect, useState } from 'react'
import './App.css'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { infoSetData, infoSetTables } from './store/sliceInfo';

import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

function App() {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  const info = useSelector(state => state.info);
  
  let accuracy = 0;

  const getData = tableName => {
    const request = {
      url: "https://acurai.ai:5100/data",
      method: 'post',
      data: {
        tableName
      }
    }

    axios(request)
    .then(response => {
      dispatch(infoSetData(response.data));
    })
    .catch(err => console.error(err));
  }

  useEffect(() => {
   axios.get("https://acurai.ai:5100/tables")
   .then(response => {
    const tables = response.data.map(t => t.Tables_in_ragtruth);
    dispatch(infoSetTables(tables));
    if (tables.length) getData(tables[0]);

   })
   .catch(err => console.error(err));
  }, [])
  return (
    <>
      <h1 className="text-blue-600 mb-4">Accuracy {accuracy}%</h1>
      <div className="selectContainer">
        <select name="tables" id="tables" onChange={e => getData(e.target.value)} className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {info.tables.map((t, i) => {
            return <option key={t} value={t}>{t}</option>
          })}
        </select>
      </div>
      <div id="buttonControls" className='flex flex-row justify-center mt-3 cursor-pointer'>
        <FaArrowCircleLeft size={32} className='mr-3'/>
        <FaArrowCircleRight size={32}/>
      </div>
    </>
  )
}

export default App
