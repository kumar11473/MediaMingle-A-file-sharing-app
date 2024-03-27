import { useState,useEffect } from 'react';
 import axios from 'axios';
import './index.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";


import Modal from './modal';

function App() {

  const [file, setFile] = useState(null);
  const [filename,setFilename]= useState('Drag and drop your file');
  const [dropstatus,setDropstatus]=useState(false);
  const [modal,setModal]=useState(false);
  const [dataLink,setDataLink]=useState('');

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.target.style="border green";
  }

  const dropHandler = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0]; // Get the first file dropped
    setFile(droppedFile); // Update state with the dropped file
  }

  const handleFileChange = (event)=>{
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  const uploadHandler=async()=>{
    if(!file){
      alert('file not uploaded yet');
    }else{

      const data=new FormData();
      data.append('uploaded-file',file);
      // console.log(data.get('file')); // okay
      const response = await axios.post('http://localhost:5000/',data);
      console.log(response);
      if(response.status==201){
        // setModal(true);
        const donwload_url=`http://localhost:5000/file/${response.data.file.id}`
        alert(`Donwload URL : ${donwload_url}`);
      }
    }
  } 

  // setFile is a asynchronous function 
  useEffect(() => {
    if(file){
      // console.log(file.name);
      setFilename(file.name);
      setDropstatus(true);
    }
  }, [file]); // Log the updated value of 'file' whenever it changes



  const modalObject={
    link:dataLink,
    status:modal,
    
  };


  return (
    <div className="bg-gray-600 h-screen flex items-center justify-center">
      <div className={ (modal===false)? 'bg-white rounded-md' : 'hidden'}>
        <div className='p-10'>
          <div className=''>
            <h1 className='text-blue-500 font-[500] text-2xl'>Upload your file</h1>
          </div>
          <div className='mt-0'>
            <p className='text-gray-500 text-sm'>file should be in .jpeg .png .mp4 .pdf format</p>
          </div>
          <label className='outline-dotted outline-blue-500 rounded-md my-5 flex flex-col p-4'
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
          >
            <input 
              type="file" 
              accept=".png, .jpeg, .pdf, .mp4, .mp3" 
              onChange={handleFileChange}
              // style={{ display: 'none' }} 
              hidden
            />
            <div className='b flex items-center justify-center mx-2'>
              {!dropstatus? <FaCloudUploadAlt color='blue' size={40} className='' /> : <FaFileAlt color='blue' size={40} />}
              
            </div>
            <div className=' mx-2 flex items-center justify-center'>
              <h1>{filename}</h1>
            </div>
          </label>
          <div className=' flex justify-center'>
            <button className='bg-blue-800 text-white  p-2 font-medium rounded-md' onClick={uploadHandler} >Upload</button>
          </div>

          {/* <div className=' max-h-20 max-w-20'>

          {file && <img src={URL.createObjectURL(file)} alt="Uploaded file" />}   // see notes
          </div> */}
         
        </div>
      </div>
      
    </div>
  );
}

export default App;
