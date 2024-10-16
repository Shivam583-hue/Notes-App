import React from 'react'

function CreateNote() {
    return (
        <div className='flex justify-end pt-[20px]'>
            <div style={{height : "700px", width : "900px"}} className='rounded-3xl bg-gray-800'>
                <div className='pl-5 pt-5'>
                    <h1 className='font-sans text-gray-300 text-3xl font-bold pb-2'>Category of Note</h1>
                    <input 
                        style={{ width: "850px", height: "50px" }} 
                        type="text" 
                        placeholder="Enter Text..." 
                        className="font-mono px-4 py-2 text-[#afb0b0] placeholder-gray-400 bg-gray-800 border-4 border-[#009378] rounded-md focus:outline-none focus:ring-[1.2px] focus:ring-[#009378] focus:border-[#009378]"
                    />
                </div>
                <div className='pl-5 pt-5'>
                    <h1 className='font-sans text-gray-300 text-3xl font-bold pb-2'>Title of Note</h1>
                    <input 
                        style={{ width: "850px", height: "50px" }} 
                        type="text" 
                        placeholder="Enter Text..." 
                        className="font-mono px-4 py-2 text-[#afb0b0] placeholder-gray-400 bg-gray-800 border-4 border-[#009378] rounded-md focus:outline-none focus:ring-[1.2px] focus:ring-[#009378] focus:border-[#009378]"
                    />
                </div>
                <div className='pl-5 pt-5'>
                <   h1 className='font-sans text-gray-300 text-3xl font-bold pb-2'>Note</h1>
                    <textarea 
                        style={{ width: "850px", height: "380px" }} 
                        placeholder="Enter Text..." 
                        className="font-mono px-4 py-2 text-[#afb0b0] placeholder-gray-400 bg-gray-800 border-4 border-[#009378] rounded-md focus:outline-none focus:ring-[1.2px] focus:ring-[#009378] focus:border-[#009378]"
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateNote