import { useEffect, useState } from 'react'
import './App.css'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { infoAcuraiSelection, infoDecrementDataIndex, infoIncrementDataIndex, infoSetData, infoSetTables } from './store/sliceInfo';

import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

function App() {
  const [showPassages, setShowPassages] = useState(false);

  const dispatch = useDispatch();
  const count = useSelector(state => state.counter)
  const info = useSelector(state => state.info);
  const {data} = info;
  console.log('data', data);
  
  let disparities = '';
  let origResponse = '';
  let acuraiResponse = '';
  let passages = [];
  
  if (data.length) {

    passages = data[info.dataIndex].package.passages;
    origResponse = data[info.dataIndex].package.origResponse;
    acuraiResponse = data[info.dataIndex]?.package?.Acurai;

    const dInfo = data[info.dataIndex].package.disparities;
    for (let i = 0; i < dInfo.length; ++i) {
      disparities += dInfo[i].meta + "<br>";
      origResponse = origResponse.replace(dInfo[i].text, `<span style="color: rgb(220 38 38); font-weight: 700;">${dInfo[i].text}</span>`)
    }

    const acuraiSelection = data[info.dataIndex].acuraiSelection ? data[info.dataIndex].acuraiSelection : '';
    if (acuraiSelection) acuraiResponse = acuraiResponse.replace(acuraiSelection, `<span style="color: green; font-weight: 700;">${acuraiSelection}</span>`)
  }

  let accuracy = 100;

  const getSelection = () => {
    let selectedText = window.getSelection().toString();
    if (selectedText) dispatch(infoAcuraiSelection(selectedText));
    console.log(selectedText);
  }

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

  useEffect(() => {
    document.addEventListener('mouseup', getSelection);
    //document.addEventListener('selectionchange', getSelection);

    return () => {
      document.addEventListener('mouseup', getSelection);
      //document.addEventListener('selectionchange', getSelection);
    }
  })

  return (
    <div className='w-100 fixed top-0 left-0 h-120'>
     <div id="contentContainer" className='h-full'>
     <h1 className="text-blue-600 mb-4">Accuracy {accuracy}%</h1>
      <div className="selectContainer">
        <select name="tables" id="tables" onChange={e => getData(e.target.value)} className="block m-auto w-5/6 px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {info.tables.map((t, i) => {
            return <option key={t} value={t}>{t}</option>
          })}
        </select>
      </div>
      <div id="buttonControls" className='flex flex-row justify-center mt-3 cursor-pointer'>
        <FaArrowCircleLeft size={32} className='mr-3' onClick={() => dispatch(infoDecrementDataIndex())}/>
        <FaArrowCircleRight size={32} onClick={() => dispatch(infoIncrementDataIndex())}/>
      </div>
      {data.length && <>

        <div className='border mx-4 mt-2 border-black rounded-md'>
          <div className='text-blue-600 font-bold mt-4'>{data[info.dataIndex].package.question}</div>
          {/* <div className="text-blue-600 italic text-sm mb-4">{data[info.dataIndex].package.model}</div> */}
          <div id="disparities" className="font-bold text-red-600 text-left px-4 mb-2" dangerouslySetInnerHTML={{__html: disparities.replaceAll('SUBTLE CONFLICT', '[SUBTLE CONFLICT]').replaceAll('Original:', 'Context:')}}>
        </div>
      

        </div>
        <div className='flex flex-row justify-start ml-4'>
         
        </div>
        <div id="responseWindows" className='flex flex-row justify-between w-full mt-4'>

     
          <div className="origResponse px-4">
            <label className="inline-flex items-center cursor-pointer invisible">
              <input type="checkbox" value="" className="sr-only peer" checked={true} />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              {/* <span className="ms-3 font-medium text-gray-900 dark:text-gray-300">Acurai is Correct</span> */}
            </label>
            <h2 className='text-lg font-bold'>{data[info.dataIndex].package.model}</h2>
            <p className='text-left' dangerouslySetInnerHTML={{__html: origResponse}}></p>
          </div>

          <div className="acuraiResponse px-4">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked={true} />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              {/* <span className="ms-3 font-medium text-gray-900 dark:text-gray-300">Acurai is Correct</span> */}
            </label>
            <h2 className='text-lg font-bold'>acurai</h2>
            
            <p className='text-left' dangerouslySetInnerHTML={{__html: acuraiResponse}}></p>
          </div>
       </div>
       <div id="passages">
        <div id="passagesButton" className={showPassages ? 'text-white bg-black border border-black cursor-pointer mt-4' : 'mt-4 text-black bg-white cursor-pointer border border-black'} onClick={() => setShowPassages(cur => !cur)}>Passages</div>
        {showPassages && <>
          {passages.map(p => <p className='text-left my-4 px-4'>{p}</p>)}
          </>
        }
       </div>
       
      </>
      }
     </div>
    </div>
  )
}

export default App
