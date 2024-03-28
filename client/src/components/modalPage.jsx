import React, { useContext } from "react";
import { uploadContext } from "../context/upload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalPage = ()=>{
    const {upload,setUpload} = useContext(uploadContext);

    const closeModalHandler = ()=>{
        setUpload({status:false,url:'xyz'})
        window.location.reload(); // for refrashing the current tab
      }
    
    const copyHandler= ()=>{
        navigator.clipboard.writeText(upload.url);
        toast.info('Download link copied');
    }

    return (
        <div className={(upload.status===true) ? 'h-screen flex items-center justify-center': 'hidden'}>
            {/* <!-- Main modal --> */}
            <div id="default-modal" class="  justify-center items-center   ">
                <div class="relative p-4 w-full max-w-2xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Download Link 
                            </h3>
                          
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-4 md:p-5 space-y-4">
                            <p class="text-green-300 dark:text-green-400">
                           { ` Download Link : ${upload.url}`}
                            </p>
                            
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={closeModalHandler}>Close</button>

                             <button data-modal-hide=" default-modal" type="button" className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={copyHandler}>Copy Link</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

 export default ModalPage;