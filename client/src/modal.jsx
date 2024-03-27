import React from "react";

const Modal = ({modalObject})=>{

    const closeModalHandler = ()=>{
        modalObject.status=false;
      }

    return (
        <div className={!modalObject.status ? 'h-screen flex items-center justify-center': 'hidden'}>
            

            {/* <!-- Main modal --> */}
            <div id="default-modal" class=" bg-white justify-center items-center   ">
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
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                               ` With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                Download Link : ${modalObject.dataLink}`
                            </p>
                            
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={closeModalHandler}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

 export default Modal;